import { Container, Row, Col } from "react-bootstrap";
import { MDBRadio } from 'mdb-react-ui-kit';
import Button from "../../../components/Button2";
import config from "../../../config";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import BookingAPI from "../../../api/ApiBooking";


function PaymentPage() {
    const navigate = useNavigate();
    const [paymentMethod, setMethodPayment] = useState(null)
    const handleChangeMethodPayment = (event) => {
        console.log(event.target.value)
        setMethodPayment(event.target.value)
    };

    const [data, setdata] = useState({})
    const [trip, settrip] = useState({})
    const [pricediscount, setPricediscount] = useState(0)
    const [wordCount, setCounut] = useState(1)

    useEffect(() => {
        const driverTrip = Cookies.get("driverTrip");
        if (driverTrip) {
            const storedObject = JSON.parse(driverTrip).date;
            settrip(storedObject);
        }

        const formData = Cookies.get("formData");
        if (formData) {
            const storedObject = JSON.parse(formData);
            setdata(storedObject);
            const myString = storedObject.listIdSeat;
            const wordsArray = myString.split("-");
            const wordCount = wordsArray.length;
            setCounut(wordCount)
        }
    }, []);


    console.log(data, trip)


    const thanhtoan = async () => {
        console.log(paymentMethod)
        if (paymentMethod == 2) {
            alert("ZaloPay đang trong giai đoạn phát triển! vui lòng thử lại sau!")
            return
        }
        if (paymentMethod == 1) {
            try {
                data.status = "Đã Thanh Toán, Chưa Đi"
                data.fareAmount = wordCount * data.fareAmount - pricediscount;
                BookingAPI.addOneBooking(data)
                    .then((resp) => {
                        BookingAPI.vnpay({
                            amount: resp.data.fareAmount,
                            orderInfo: resp.data._id
                        }).then((response) => {
                            const urlvnp = response.data.vnpUrl
                            window.location.href = urlvnp
                        })
                            .catch((err) => {
                                console.error(err)
                                alert('Đã có lỗi xảy ra')
                            })
                    })
                    .catch((err) => {
                        console.error(err)
                        alert('Đã có lỗi xảy ra')
                    });
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        } else {
            try {
                data.status = "Chưa Thanh Toán"
                console.log(data)
                const data1 = await BookingAPI.addOneBooking(data)
                    .then((response) => {
                        console.log(response)
                        alert("Booking Thành Công")
                    })
                    .catch((e) => {
                        alert("Đặt vé thất bại")
                    })

            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }
    }

    const vetrangchu = () => {

        Cookies.remove("dropoff");
        Cookies.remove("driverTrip");
        Cookies.remove("formData");
        Cookies.remove("pickup");
        Cookies.remove("dropoff");
        navigate("/")
    }



    const [promotionValue, setPromotionValue] = useState('');

    const handlePromotionChange = (event) => {
        setPromotionValue(event.target.value);
    };

    const handleApplyPromotion = () => {
        console.log('Applied promotion:', promotionValue);
        fetchDataTRIPs();
    };


    const fetchDataTRIPs = async () => {
        try {
            let data_ = await BookingAPI.promotion(JSON.parse(Cookies.get("driverTrip"))._id, promotionValue);
            setPricediscount(data_.data.discountAmount)
            alert("OK");
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Mã khuyến mãi không hợp lệ');
        }
    };


    return (

        <Container fluid={false} className="bg-gray-200">
            <Row className="m-2 p-2 fs-3">
                <div class="flex items-center bg-blue-500 text-white font-bold px-4 py-3" role="alert">
                    <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                    <p>Phương thức thanh toán đa dạng, bảo mật.</p>
                </div>
            </Row>
            <Row>
                <Col>
                    <h3>Chọn phương thức thanh toán</h3>
                    <div className="border-2 border-blue-500 border-opacity-75 md:border-opacity-50 m-2 p-2">
                        <div className="border-bottom  border-danger mt-2">
                            <span className="text-sky-500"><MDBRadio onChange={handleChangeMethodPayment} value={1} name='payment' id='vnpay' label='Thanh Toán VNPAY' /></span>
                            <div className="pl-10 flex m-4">
                                <img src="https://229a2c9fe669f7b.cmccloud.com.vn/httpImage/vn_pay.svg" alt="VNPAY_APP" class="PaymentMethodDetail__SvgIcon-w82yqq-2 ofcui"></img>
                                <span className="ml-4">Thiết bị cần cài đặt Ứng dụng ngân hàng (Mobile Banking) hoặc Ví VNPAY</span>
                            </div>
                        </div>

                        <div className="border-bottom  border-danger mt-2">
                            <span className="text-sky-500"><MDBRadio onChange={handleChangeMethodPayment} value={2} name='payment' id='zalopay' label='Thanh Toán ZALOPAY' /></span>
                            <div className="pl-10 flex m-4">
                                <img src="https://229a2c9fe669f7b.cmccloud.com.vn/httpImage/zalo_pay.svg" alt="ZALO_PAY_APP" class="PaymentMethodDetail__SvgIcon-w82yqq-2 ofcui"></img>
                                <span className="ml-4">Điện thoại của bạn phải được cài đặt ứng dụng Zalopay</span>
                            </div>
                        </div>

                        <div className="border-bottom  border-danger mt-2">
                            <span className="text-sky-500"><MDBRadio onChange={handleChangeMethodPayment} value={3} name='payment' id='cash' label='Thanh Toán Tiền Mặt' /></span>
                            <div className="pl-10 flex m-4">
                                <img src="https://229a2c9fe669f7b.cmccloud.com.vn/httpImage/credit_card.svg" alt="VISA" class="PaymentMethodDetail__SvgIcon-w82yqq-2 ofcui"></img>
                                <span className="ml-4">Thanh Toán Khi Lên Xe</span>
                            </div>
                        </div>

                    </div>
                    <div>
                        <button onClick={thanhtoan} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                            Thanh Toán Bảo Mật
                        </button>
                    </div>
                </Col>
                <Col>

                    <h3>Thông tin chuyến đi</h3>
                    <div className="border-2 border-blue-500 border-opacity-75 md:border-opacity-50 m-2 p-2">

                        <div className="m-2 p-2 ">
                            <span className="text-purple-700 text-opacity-50 fs-4">Số Điện Thoại</span>
                            <p>{Cookies.get('phone')}</p>
                        </div>
                        <div className="m-2 p-2 ">
                            <span className="text-purple-700 text-opacity-50 fs-4">Email</span>
                            <p>{Cookies.get('email')}</p>
                        </div>

                        <div className="m-2 p-2 border-bottom  border-danger "></div>

                        <div className="m-2 p-2 ">
                            <span className="text-purple-700 text-opacity-50 fs-4">Nhà Xe</span>
                            {/* <p>{JSON.parse(Cookies.get("driverTrip")).phoneCompany.name}</p> */}
                        </div>
                        <div className="m-2 p-2 ">
                            <span className="text-purple-700 text-opacity-50 fs-4">Dự kiến đón</span>
                            <p>{JSON.parse(Cookies.get("pickup"))?.timePickUp} ...  {JSON.parse(Cookies.get("date"))} {JSON.parse(Cookies.get("pickup")).name}</p>
                        </div>
                        <div className="m-2 p-2 ">
                            <span className="text-purple-700 text-opacity-50 fs-4">Dự kiến trả</span>
                            <p>{JSON.parse(Cookies.get("dropoff"))?.timeDropOff} ...  {JSON.parse(Cookies.get("date"))} {JSON.parse(Cookies.get("dropoff")).name} </p>
                        </div>

                    </div>
                    <h1>Bạn Có Mã Giảm Giá</h1>
                    <div className="border-2 border-blue-500 border-opacity-75 md:border-opacity-50 m-2 p-2">
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <label className="block text-gray-700 fs-2 font-bold mb-2">
                                <input
                                    value={promotionValue}
                                    onChange={handlePromotionChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="promotion" />
                                <button onClick={handleApplyPromotion} class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 mt-2 border-4 text-white py-1 px-2 rounded" type="button">
                                    Áp Dụng
                                </button>
                            </label>
                        </form>
                    </div>

                    <div>
                        <Row className="m-2 p-2">
                            <Col className="flex justify-content-between">
                                <span>Tổng Tiền</span>
                                <span>{data.fareAmount * wordCount - pricediscount} <span> Đ</span></span>
                            </Col>
                        </Row>
                    </div>
                    <button onClick={vetrangchu} class="bg-blue-500 m-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Về Trang Chủ
                    </button>

                </Col >

            </Row >

        </Container >
    );
}

export default PaymentPage;