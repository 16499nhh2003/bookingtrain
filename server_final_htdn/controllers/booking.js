const Booking = require('../models/booking')
const Car = require('../models/car')
const User = require('../models/user')
const DriverTrip = require('../models/driver_trip')
const PickUpModel = require('../models/location_pickup')
const DropoffModel = require('../models/location_dropoff')

const asyncHandler = require('express-async-handler')
const slugify = require('slugify');
const sendMail = require('../utils/sendMail')
const {generateRandomPassword, generateConfirmationCode} = require('../utils/utils')

const createBooking = async (req, res, next) => {
    let {
        bookingDate, fareAmount, isProtect, phoneUser, iddriverTrip, listIdSeat, idCar, status, idDropOff, idPickUp
    } = req.body;
    try {
        // kiểm tra có body json gửi lên 
        if (Object.keys(req.body).length === 0) throw new Error('Missing input');

        // xử lý danh sách các ghế do người dùng chọn
        listIdSeat = listIdSeat.replace(/^"|"$/g, '');
        seat = listIdSeat.split("-")

        // querry data
        const car = await Car.findById(idCar)
        const driverTrip = await DriverTrip.findById(iddriverTrip)

        let pickup = null;
        let dropoff =  null;
        if(idPickUp && idDropOff){
            pickup = await PickUpModel.findById(idPickUp)
            dropoff = await DropoffModel.findById(idDropOff)
        }

        let user = await User.findOne({mobile: phoneUser})

        // kiểm tra 400
        if (!car || !driverTrip) {
            return res.status(400).json({
                error: 'Thiếu dữ liệu đầu vào'
            })
        }

        // tạo tài khoản cho khách hàng bởi nhân viên 
        if (!user) {
            user = await User.create({
                email: phoneUser + "@gmail.com",
                mobile: phoneUser,
                password: generateRandomPassword(),
                isBlocked: false,
                role: 'user',
            });
            const confirmationEmailData = {
                email, html: `Xin chào , tài khoản của bạn đã được tạo thành công 
                email : ${user.email}  và password :${user.password}`
            };
            await sendMail(confirmationEmailData);
        }
        // tạo mới một booking
        const newBooking = await Booking.create({
            bookingDate: new Date(),
            fareAmount,
            isProtect,
            user,
            driverTrip: driverTrip._id,
            seats: seat,
            car: car._id,
            status,
            detailPickUpLocation: !pickup ? null :  pickup._id,
            detailDropOffLocation: !dropoff ? null  : dropoff._id,
        });
        if (!newBooking) {
            throw new Error('KHÔNG TẠO ĐƯỢC XE')
        }

        // cập nhật danh sách các bookings và danh sách các ghế được đặt trong model drivertrip
        const bookings = [...driverTrip.bookings, newBooking._id]
        const seats_bookings = [...driverTrip.seats_bookings, ...seat]
        await DriverTrip.findByIdAndUpdate(driverTrip._id, {bookings, seats_bookings})
            .then((result) => {
                return res.status(200).json(newBooking)
            }).catch((err) => {
                throw new Error(err)
            });

    } catch (error) {
        console.error(error)
        next(error)
    }

};

const getBookingByDriverTrip = async (req, res, next) => {
    const {iddrivertrip} = req.query;
    try {
        if (!iddrivertrip) {
            throw new Error('Không tồn tại id driver trip')
        }
        const driver_trip = await Booking.find({driverTrip: iddrivertrip})
            .populate({path: 'user', select: 'mobile firstname lastname email'})
            .populate({
                path: 'driverTrip', select: 'trip', populate: {
                    path: 'trip',
                    select: 'dropofflocation pickuplocation',
                    populate: [{path: 'dropofflocation', select: 'nameProvince addressDetail'}, {
                        path: 'pickuplocation', select: 'nameProvince addressDetail'
                    }]
                }
            })
            .populate({
                path: 'seats', select: 'numberName'
            })
            .populate({
                path: 'car', select: '_id license_plates'
            })
        return res.status(200).json(driver_trip)
    } catch (error) {
        next(error)
    }
}


// controller lấy tất cả vé xe của người dùng bởi số điện thoại
const getAllBookingByPhoneUser = async (req, res, next) => {
    const {mobile} = req.query
    try {

        const user = await User.findOne({mobile})
        if (!user) {
            throw new Error('User not found')
        }
        const booking = await Booking
            .find({user: user._id})
            .populate( {path :'car detailPickUpLocation detailDropOffLocation' })
            .populate({path : 'driverTrip' , populate : 'trip'})
        return res.status(200).json(booking)
    } catch (e) {
        next(e)
    }
}

//controller lấy chi tiéết một booking
const getOneBookingById = async (req, res, next) => {
    try {
        const {id} = req.params
        const booking = await Booking.findById(id)
            .populate('detailPickUpLocation  detailDropOffLocation driverTrip user seats')
            .populate({
                path: 'driverTrip', populate: {path: 'trip', populate: {path: 'dropofflocation pickuplocation'}}
            })
            .populate({
                path : 'car'  ,
                populate : {path : 'typecar_id'}
            })
        return res.json(booking)
    } catch (e) {
        next(e)
    }
}



// const getAllBooking = asyncHandler(async (req, res) => {
//     const booking = await Booking.find();
//     return res.status(200).json({
//         success: booking ? true : false,
//         bookings: booking ? booking : 'Cannot get all Booking'
//     })
// })

// const updateBooking = asyncHandler(async (req, res) => {
//     const { bId } = req.params
//     const updatedBooking = await Booking.findByIdAndUpdate(bId, req.body, { new: true })
//     return res.status(200).json({
//         success: updatedBooking ? true : false,
//         updatedBooking: updatedBooking ? updatedBooking : 'Cannot update Booking'
//     })
// })

// const deleteBooking = asyncHandler(async (req, res) => {
//     const { bId } = req.params
//     const deletedBooking = await Booking.findByIdAndDelete({ _id: bId });
//     return res.status(200).json({
//         success: deletedBooking ? true : false,
//         deletedBooking: deletedBooking ? deletedBooking : 'Cannot delete Booking'
//     });
// });

module.exports = {
    createBooking, getBookingByDriverTrip, getAllBookingByPhoneUser, getOneBookingById
    // getBooking,
    // getAllBooking,
    // updateBooking,
    // deleteBooking
}