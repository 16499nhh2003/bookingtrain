
import Modal from 'react-modal';
import { Container, Row, Col } from "react-bootstrap";
import { MDBRadio } from 'mdb-react-ui-kit';
import BookingAPI from "../../../api/ApiBooking";
import ApiAuth from "../../../api/ApiAuth";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Button from "../../../components/Button2";
import config from "../../../config";
import Cookies from "js-cookie";
import { f } from '../../../utils/constanst'


function DetailItem() {
    const customStyles = {
        content: {
            width: '400px',
            margin: 'auto',

            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            backgroundColor: '#fff',
            height: '500px',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    };
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');
    const [booking, setBooking] = useState({})
    const [payment, setPayment] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                let bookingData = await BookingAPI.getone(id)
                bookingData = bookingData.data
                setBooking(bookingData);
                // console.log(bookingData)

                const paymentData = await BookingAPI.getlistPaymentbyIdBooking(id);
                setPayment(paymentData.data);
                console.log(paymentData)
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Co loi xay ra')
                // Handle error, redirect to an error page, or show a user-friendly message
            }
        };

        fetchData();
    }, []);

    const handleDelete = (id) => {
        openDeleteModal()
    }

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleSubmit_ = async (e) => {
        e.preventDefault();

        const currentDateTime = new Date()
        const dateDriverTrip = booking.driverTrip.date
        const timeDriverTrip = booking.driverTrip.trip.pickUpTime

        let driverTripDateTime = f(dateDriverTrip, timeDriverTrip)
        const thirtyMinutesBeforeDriverTrip = new Date(driverTripDateTime);
        thirtyMinutesBeforeDriverTrip.setMinutes(thirtyMinutesBeforeDriverTrip.getMinutes() - 30);

        if (currentDateTime < thirtyMinutesBeforeDriverTrip) {
            await BookingAPI.huychuyen(booking._id)
                .then((result) => {
                    alert('Hủy chuyến thành công')
                    setIsDeleteModalOpen(false)
                }).catch((err) => {
                    alert('Đã có lỗi xảy ra')
                });
        } else {
            alert("Đã quá thời điểm được phép hủy.");
        }
    }


    const handleSubmit__ = async (e) => {
        e.preventDefault();

        const currentDateTime = new Date()
        const dateDriverTrip = booking.driverTrip.date
        const timeDriverTrip = booking.driverTrip.trip.pickUpTime

        let driverTripDateTime = f(dateDriverTrip, timeDriverTrip)
        const thirtyMinutesBeforeDriverTrip = new Date(driverTripDateTime);
        thirtyMinutesBeforeDriverTrip.setMinutes(thirtyMinutesBeforeDriverTrip.getMinutes() - 30);

        // console.log(currentDateTime ,thirtyMinutesBeforeDriverTrip )

        if (currentDateTime < thirtyMinutesBeforeDriverTrip) {
            const formdata = new FormData(e.target)
            const data = {}
            
            formdata.forEach((value, key) => {
                data[key] = value;
            });

            console.log(JSON.stringify(data))
            // return 
            await BookingAPI.refund(payment._id, JSON.stringify(data))
                .then((result) => { 

                    alert('Hủy chuyến thành công. Vui lòng đợi hoàn tiền')
                }).catch((err) => {
                    console.log(err)
                    alert('Có lỗi xảy ra')
                });
        } else {
            alert("Xe chuẩn bị khởi hành hoặc đã khởi hành Hành khách không được phép hủy.");
        }

    }


    return (
        <Container fluid={false} className="bg-gray-200">
            <Button to={"/" + config.routes.VeCuaToi} class="bg-blue-500 m-4 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                Quay Lại
            </Button>
            <Row className="m-2 p-2 fs-3">

            </Row>
            <Row>
                <Col>
                    <h3>Thông tin</h3>
                    <div className="border-2 border-blue-500 border-opacity-75 md:border-opacity-50 m-2 p-2">
                        <div className="m-2 p-2 border-bottom  border-danger mt-2">
                            <h1>Thanh toán thành công   </h1>
                            <span>Chúng tôi đã gửi thông tin chuyến đi đến email {Cookies.get("email")}, bạn hãy kiểm tra thật kĩ nhé!</span>
                        </div>

                        <div className="m-2 p-2 border-bottom  border-danger mt-2">
                            <h1>TThông tin vé</h1>
                            <div>Biển số xe: {booking.car && booking.car.licenseplates ? booking.car.licenseplates : 'N/A'}</div>
                            <div>
                                Lưu ý: Mọi thông tin về chuyến đi (bao gồm biển số xe, số điện thoại tài xế,...) sẽ được Vexere thông báo đến quý khách qua email ngay sau khi nhà xe cập nhật thông tin. Thông thường nhà xe sẽ cập nhật thông tin này trễ nhất 15-30 phút trước giờ khởi hành tùy thuộc vào kế hoạch của nhà xe.
                                Nếu gặp vấn đề khi ra xe, quý khách vui lòng liên hệ theo số Hotline nhà xe.
                            </div>
                        </div>

                        <div className="m-2 p-2 border-bottom  border-danger mt-2">
                            Bạn cần ra điểm đón trước 15 phút, đưa email xác nhận thanh toán của Vexere cho nhân viên văn phòng vé để đổi chứng từ giấy

                            Khi lên xe, bạn xuất trình chứng từ giấy cho tài xế hoặc phụ xe.
                        </div>

                    </div>
                    <div>
                    </div>
                    {
                        booking.status !== 'Bị Hủy' ? (
                            <button onClick={() => handleDelete()} className="bg-red-500 m-4 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                Hủy chuyến
                            </button>
                        ) : null
                    }
                </Col>
                <Col>
                    <h3>Thông tin chuyến đi</h3>
                    <div className="border-2 border-blue-500 border-opacity-75 md:border-opacity-50 m-2 p-2">
                        <div className="m-2 p-2 ">
                            <span className="text-purple-700 text-opacity-50 fs-4">Mã đơn hàng </span>
                            <p>{booking._id}</p>
                        </div>
                        <div className="m-2 p-2 border-bottom  border-danger "></div>

                        <div className="m-2 p-2 ">
                            <span className="text-purple-700 text-opacity-50 fs-4">Họ Tên</span>
                            <p>{booking.user && booking.user ? booking.user.firstname + booking.user.lastname : 'N/A'}</p>
                        </div>

                        <div className="m-2 p-2 border-bottom  border-danger "></div>

                        <div className="m-2 p-2 ">
                            <span className="text-purple-700 text-opacity-50 fs-4">Số Điện Thoại</span>
                            <p>{booking.user && booking.user ? booking.user.mobile : 'N/A'}</p>
                        </div>
                        <div className="m-2 p-2 border-bottom  border-danger "></div>

                        <div className="m-2 p-2 ">
                            <span className="text-purple-700 text-opacity-50 fs-4">Email</span>
                            <p>{booking.user && booking.user ? booking.user.email : 'N/A'}</p>
                        </div>
                        <div className="m-2 p-2 border-bottom  border-danger "></div>

                        <div className="m-2 p-2 ">
                            <span className="text-purple-700 text-opacity-50 fs-4">CCCD/CMND</span>
                            <p></p>
                        </div>
                        <div className="m-2 p-2 border-bottom  border-danger "></div>

                        <div className="m-2 p-2 ">
                            <span className="text-purple-700 text-opacity-50 fs-4">Tuyến đường</span>
                            <p>{booking.driverTrip && booking.driverTrip.trip.pickuplocation && booking.driverTrip.trip.dropofflocation
                                ? `${booking.driverTrip.trip.pickuplocation.nameProvince} - ${booking.driverTrip.trip.dropofflocation.nameProvince}`
                                : 'N/A'}</p>
                        </div>
                        <div className="m-2 p-2 border-bottom  border-danger "></div>
                        <div className="m-2 p-2 ">
                            <span className="text-purple-700 text-opacity-50 fs-4">Loại xe</span>
                            <p>{booking.car ? booking.car.typecar_id.type_name : 'N/A'}</p>
                        </div>
                        <div className="m-2 p-2 border-bottom  border-danger "></div>
                        <div className="m-2 p-2 ">
                            <span className="text-purple-700 text-opacity-50 fs-4">Chỗ ngồi</span>
                            <p>
                                {booking.seats && booking.seats.length > 0 ? (
                                    <ul>
                                        {booking.seats.map((seat, index) => (
                                            <li key={index}>{`${seat._id} - Số ghế ${seat.numberName}`}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No driver trips available</p>
                                )}
                            </p>
                        </div>
                        <div className="m-2 p-2 border-bottom  border-danger "></div>

                        <div className="m-2 p-2 ">
                            <span className="text-purple-700 text-opacity-50 fs-4">Dự kiến đón</span>
                            <p>{booking.detailPickUpLocation ? booking.detailPickUpLocation.name : 'N/A'} -
                                {booking.detailPickUpLocation ? booking.detailPickUpLocation.timePickUp : 'N/A'}
                            </p>
                        </div>
                        <div className="m-2 p-2 border-bottom  border-danger "></div>

                        <div className="m-2 p-2 ">
                            <span className="text-purple-700 text-opacity-50 fs-4">Dự kiến trả</span>
                            <p>
                                {booking.detailDropOffLocation ? booking.detailDropOffLocation.name : 'N/A'} -
                                {booking.detailDropOffLocation ? booking.detailDropOffLocation.timeDropOff : 'N/A'}

                            </p>
                        </div>
                    </div>
                    <Row className="m-2 p-2">
                        <Col className="">
                            <div className="flex justify-content-between">
                                <span>Tổng Tiền</span>
                                <span>{booking.fareAmount ? booking.fareAmount : 'N/A'}<span> Đ</span></span>
                            </div>
                            <div className="flex justify-content-between">
                                <span>Trạng thái</span>
                                <span>{booking.status ? booking.status : 'N/A'}</span>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Modal isOpen={isDeleteModalOpen}
                onRequestClose={closeDeleteModal}
                style={customStyles}
                contentLabel="Delete Confirmation Modal">
                <h2>Xác nhận xóa?</h2>
                <div>
                    {booking.status === 'Chưa Thanh Toán' ? (<>
                        <form onSubmit={handleSubmit_} >
                            <div className="mb-4">
                                <label htmlFor="bookingid" className="block text-4xl m-4 font-medium text-gray-600">
                                    Mã Booking
                                </label>
                                <input
                                    type="text"
                                    className="form-input border-2 border-indigo-600 text-2xl m-4  block w-full"
                                    id="bookingid"
                                    name="bookingid"
                                    required
                                    value={booking._id ? booking._id : '0'}
                                />
                            </div>
                            <button type="submit" className="bg-blue-500 m-4  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Xác nhận hủy
                            </button>

                        </form>
                    </>) : (<></>)}

                    {booking.status === 'Đã Thanh Toán, Chưa Đi' ? (<>
                        <form onSubmit={handleSubmit__} encType='multipart/form-data' >
                            <div className="mb-4">
                                <label htmlFor="bookingid" className="block text-4xl m-4 font-medium text-gray-600">
                                    Mã Booking
                                </label>
                                <input
                                    type="text"
                                    className="form-input border-2 border-indigo-600 text-2xl m-4  block w-full"
                                    id="bookingid"
                                    name="bookingid"
                                    required
                                    value={booking._id ? booking._id : '0'}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="orderId" className="block text-4xl m-4 font-medium text-gray-600">
                                    Thông tin đơn hàng:
                                </label>
                                <input
                                    type="text"
                                    className="form-input border-2 border-indigo-600 text-2xl m-4 block w-full"
                                    id="orderId"
                                    name="orderId"
                                    required
                                    value={payment._id ? payment._id : 'N/A'}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="amountt" className="block text-4xl m-4 font-medium text-gray-600">
                                    Số Tiền:
                                </label>
                                <input
                                    type="number"
                                    className="form-input border-2 border-indigo-600 text-2xl m-4 block w-full"
                                    id="amountt"
                                    name="amountt"
                                    required
                                    value={payment.amount ? payment.amount : 'N/A'}

                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="transDate" className="block text-4xl m-4 font-medium text-gray-600">
                                    Ngày Thanh Toán:
                                </label>
                                <input
                                    type="text"
                                    className="form-input border-2 border-indigo-600 text-2xl m-4 block w-full"
                                    id="transDate"
                                    name="transDate"
                                    required
                                    value={payment.transdate ? payment.transdate : 'N/A'}

                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="user" className="block text-4xl m-4 font-medium text-gray-600">
                                    Số điện thoại:
                                </label>
                                <input
                                    type="text"
                                    className="form-input border-2 border-indigo-600 text-2xl m-4 block w-full"
                                    id="user"
                                    name="user"
                                    required
                                    value={booking.user ? booking.user.mobile : 'N/A'}
                                />
                            </div>

                            <p>Số Tiền bạn được hoàn bằng 80% số tiền thanh toán</p>

                            <button type="submit" className="bg-blue-500 m-4  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Xác nhận hủy và Hoàn tiền
                            </button>

                        </form>
                    </>) : (<></>)}


                </div>
            </Modal>
        </Container>
    )
}
export default DetailItem
