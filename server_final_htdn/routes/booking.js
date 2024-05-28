const router = require('express').Router()


const moment = require('moment');
const config = require("../config/default.json");
const crypto = require("crypto");
const request = require('request');
let fetch = require('node-fetch');

// middleware 
const { verifyAccessToken, isAdmin, isOwner } = require('../middlewares/verifyToken')

// controller
const ctrls = require('../controllers/booking')

// model
const Booking_Model = require('../models/booking')
const DriverTrip_Model = require('../models/driver_trip')
const transaction_model = require('../models/transaction')

//service
let serviceBooking = require('../service/booking')
let servicePayment = require('../service/payment')
let serviceUser = require('../service/user')


// routess
router.post('/', ctrls.createBooking);
router.get('/trip', ctrls.getBookingByDriverTrip)
router.get('/user', ctrls.getAllBookingByPhoneUser)
router.get("/one/:id", ctrls.getOneBookingById)


// Hủy vé ( với trạng thái là chưa thanh toán)
router.put('/update-status/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const booking = await Booking_Model.findByIdAndUpdate(id, {
            status: 'Đã Hủy'
        }, { new: true });

        if (booking) {
            const idDrivertrip = booking.driverTrip;
            let drivertrip = await DriverTrip_Model.findById(idDrivertrip);

            // danh sách các ghế của vé này
            let seatOfBooking = booking.seats;

            // các ghế đã đặt của các vé trong chuyến đi này
            let seatBooking = drivertrip.seats_bookings;
            seatBooking = seatBooking.filter(item => !seatOfBooking.includes(item))

            // cập nhật lại các ghế của chuyến đi
            drivertrip = await DriverTrip_Model.findByIdAndUpdate(idDrivertrip, { seats_bookings: seatBooking }, { new: true })
            return res.status(200).json(drivertrip)
        }

        res.status(200).json();


    } catch (error) {
        next(error)
    }
})
router.post('/create_payment_url', function (req, res, next) {

    const { orderInfo } = req.body
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;


    let config = require('../config/default.json');

    let tmnCode = config.vnp_TmnCode;
    let secretKey = config.vnp_HashSecret;
    let vnpUrl = config.vnp_Url;
    let returnUrl = config.vnp_ReturnUrl;
    let orderId = moment(date).format('DDHHmmss') + ":" + orderInfo;
    let amount = req.body.amount;

    let locale = req.body.language || 'vn';
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    // if (bankCode !== null && bankCode !== '') {
    //     vnp_Params['vnp_BankCode'] = bankCode;
    // }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    res.status(200).json({ vnpUrl })
});
router.get('/vnpay_return', async function (req, res, next) {
    try {
        let vnp_Params = req.query;
        let secureHash = vnp_Params['vnp_SecureHash'];
        let orderId = vnp_Params['vnp_TxnRef'];
        let rspCode = vnp_Params['vnp_ResponseCode'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);
        let config = require('../config/default.json');
        let secretKey = config.vnp_HashSecret;
        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");


        let id = orderId.split(':')[1]
        let booking = await Booking_Model.findById(id)


        let paymentStatus = '0'; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
        //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
        //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

        let checkOrderId = id == booking._id; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
        let checkAmount = vnp_Params['vnp_Amount'] / 100 === booking.fareAmount; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
        if (secureHash === signed) { //kiểm tra checksum
            if (checkOrderId) {
                if (checkAmount) {
                    if (paymentStatus == "0") { //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
                        if (rspCode == "00") {
                            //thanh cong
                            //paymentStatus = '1'
                            // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn

                            //  add one entity PAYMENT 
                            let payment = await servicePayment.addPayment({
                                amount: booking.fareAmount,
                                status: 'Đã thanh toán',
                                transdate: vnp_Params['vnp_PayDate'],
                                trantype: "03",
                                booking: booking._id,
                                orderId: vnp_Params['vnp_TxnRef']
                            })
                            if (payment) {
                                booking.status = 'Đã Thanh Toán, Chưa Đi'

                                let newbooking = await booking.save()
                                let resp1updatePoints = await serviceUser.modifyPoint({
                                    point: 1,
                                    bookingid: booking._id
                                })

                                if (newbooking && resp1updatePoints) {
                                    return res.redirect('http://localhost:3000/payment/success')
                                }
                            }
                        } else {
                            //that bai
                            //paymentStatus = '2'
                            // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
                            res.redirect('http://localhost:3000/payment/fail')
                        }
                    } else {
                        res.status(200).json({
                            RspCode: '02',
                            Message: 'This order has been updated to the payment status'
                        })
                    }
                } else {
                    res.status(200).json({ RspCode: '04', Message: 'Amount invalid' })
                }
            } else {
                res.status(200).json({ RspCode: '01', Message: 'Order not found' })
            }
        } else {
            res.status(200).json({ RspCode: '97', Message: 'Checksum failed' })
        }
    } catch (e) {
        res.redirect('http://localhost:3000/payment/fail')
    }

})
router.post('/refund', async (req, res, next) => {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();

    let config = require('../config/default.json');
    let crypto = require("crypto");
    // Import fetch library

    let vnp_TmnCode = config.vnp_TmnCode
    let secretKey = config.vnp_HashSecret
    let vnp_Api = config.vnp_Api

    let vnp_TxnRef = req.body.orderId || '10192735:661685b771a439aa5462cb3a';
    let vnp_TransactionDate = req.body.transDate || '20240410192803';
    let vnp_Amount = req.body.amountt || '10000000';
    let vnp_TransactionType = "02";
    let vnp_CreateBy = req.body.user || '1220';
    let idbooking = req.body.bookingid
    let { idpay } = req.query

    let currCode = 'VND';

    let vnp_RequestId = moment(date).format('HHmmss');
    let vnp_Version = '2.1.0';
    let vnp_Command = 'refund';
    let vnp_OrderInfo = 'Hoan tien GD ma:' + vnp_TxnRef;

    let vnp_IpAddr = "127.0.0.1"
    let vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

    let vnp_TransactionNo = '0';

    let data = vnp_RequestId + "|" + vnp_Version + "|" + vnp_Command + "|" + vnp_TmnCode + "|" + vnp_TransactionType + "|" + vnp_TxnRef + "|" + vnp_Amount + "|" + vnp_TransactionNo + "|" + vnp_TransactionDate + "|" + vnp_CreateBy + "|" + vnp_CreateDate + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;
    let hmac = crypto.createHmac("sha512", secretKey);
    let vnp_SecureHash = hmac.update(Buffer.from(data, 'utf-8')).digest("hex");

    let dataObj = {
        'vnp_RequestId': vnp_RequestId,
        'vnp_Version': vnp_Version,
        'vnp_Command': vnp_Command,
        'vnp_TmnCode': vnp_TmnCode,
        'vnp_TransactionType': vnp_TransactionType,
        'vnp_TxnRef': vnp_TxnRef,
        'vnp_Amount': vnp_Amount,
        'vnp_CreateBy': vnp_CreateBy,
        'vnp_OrderInfo': vnp_OrderInfo,
        'vnp_TransactionDate': vnp_TransactionDate,
        'vnp_CreateDate': vnp_CreateDate,
        'vnp_IpAddr': vnp_IpAddr,
        'vnp_SecureHash': vnp_SecureHash
    };
    try {
        request({
            url: vnp_Api,
            method: "POST",
            json: true,
            body: dataObj
        }, async function (error, response, body) {
            let updatebooking = await serviceBooking.updateBooking({ id: idbooking })
            let trans = await servicePayment.updatePayment({ id: idpay })

            if (!updatebooking || !trans) {
                throw new Error('One or both updates failed.');
            }

            return res.status(200).json({
                vnp_ResponseCode: "00"
            });
        });

    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'An error occurred while processing the refund.' });
    }
});

// cập nhật thanh toán theo trạng thái
router.put('/update/booking/:id', async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body
    const trangthaithanhtoanthanhcong = 'Đã Thanh Toán, Chưa Đi'
    const trangthaigiaodichthanhcong = 'Đã Thanh Toán'
    const phuongthucthanhtoan = 'Thanh toán trực tiếp'
    const currentDate = new Date()
    try {
        const booking = await Booking_Model.findByIdAndUpdate(id, {
            status
        }, { new: true });

        // thêm giao dịch vào entity transactions 
        if (status === trangthaithanhtoanthanhcong) {
            let resp = await servicePayment.addPayment({
                amount :+booking.fareAmount, 
                booking:  id,
                status: trangthaigiaodichthanhcong,
                transdate: moment(currentDate).format('YYYYMMDDHHmmss'),
                trantype: phuongthucthanhtoan,
                orderId: ''
            })
            return res.status(200).json(resp)
        }
        return res.status(200).json(booking)
    } catch (error) {
        next(error)
    }
})


function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

module.exports = router
