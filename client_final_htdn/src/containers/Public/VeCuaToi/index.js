import { React, useState, useEffect } from "react";
import BookingAPI from '../../../api/ApiBooking'
import Cookies from "js-cookie";
import { useNavigate, } from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { differenceInDays, format, parseISO } from "date-fns"
const moment = require('moment');

function VeCuaToi() {
    const navigate = useNavigate()
    const [bookings, setBookings] = useState([])
    const [bookingsChuaDi, setBookingsChuaDi] = useState([])
    const [bookingsDaDi, setBookingsDaDi] = useState([])
    const [bookingBiHuy, setBookingsBiHuy] = useState([])

    const fetchBooking = async () => {
        let data = await BookingAPI.getlistBookingByUser(Cookies.get("phone"));
        data = data.data
        console.log(data)
        setBookings(data)
        fectData(data)
        fectData_(data)
        fectData__(data)
    }

    const fectData = (data) => {
        const filtered = data.filter(booking => {
            return (
                (booking.status.toLowerCase() === 'Đã Thanh Toán, Chưa Đi'.toLowerCase() || booking.status.toLowerCase() === 'Chưa Thanh Toán'.toLowerCase())
            );
        });
        setBookingsChuaDi(filtered);
    };

    const fectData_ = (data) => {
        const filtered = data.filter(booking => {
            return (
                (booking.status.toLowerCase() === 'Đã Thanh Toán'.toLowerCase())
            );
        });
        setBookingsDaDi(filtered);
    };

    const fectData__ = (data) => {
        const filtered = data.filter(booking => {
            return (
                (booking.status.toLowerCase() === 'Đã Hủy'.toLowerCase())// Kiểm tra ngày
            );
        });
        console.log(filtered)
        setBookingsBiHuy(filtered);
    };


    useEffect(() => {
        fetchBooking()
    }, [])

    const handleTabClick = (tabKey) => {
        if (tabKey === "hientai") {

        } else if (tabKey === "dadi") {

        }
        else if (tabKey === "dadahuydi") {

        }
    };

    const quaylai = () => {
        navigate('/');
    }

    const onClick = (id) => {
        navigate(`/detailitem?id=${id}`);
    }


    return (
        <div className="w-full bg-slate-200 m-4 p-4">
            <button onClick={quaylai} class="bg-blue-500 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Quay Lại
            </button>
            <Tabs
                id="uncontrolled-tab-example"
                className="mb-3 "
                onSelect={handleTabClick}>
                <Tab eventKey="hientai" title="Hiện Tại">
                    {bookingsChuaDi.map((booking, index) => (
                        <div key={index} onClick={() => onClick(booking._id)} className="p-2 bg-red-100 cursor-pointer m-4">
                            <div className="m-2 p-2 flex justify-between ">
                                <p>{format(new Date(booking.driverTrip.date), "yyyy-MM-dd")}  - Thời gian khởi hành {booking.driverTrip.trip.dropOffTime} </p>
                                <p className="text-green-900 fw-bold">{booking.status}</p>
                            </div>
                            <div className="m-2 p-2">{booking._id}</div>
                            <div className="m-2 p-2">{booking.driverTrip.pickupTime}</div>
                            <div className="m-2 p-2">{booking.driverTrip.fareAmount}</div>
                            <div className="m-2 p-2">{booking?.detailPickUpLocation ? booking?.detailPickUpLocation.name : 'Tại bến xuất phát'} - {booking?.detailDropOffLocation ? booking?.detailDropOffLocation.name : 'Tại Bến kết thúc'}</div>
                            <div className="m-2 p-2">Biển Số Xe: {booking.car && booking.car.license_plates ? booking.car.license_plates : 'N/A'}</div>
                        </div>
                    ))}
                </Tab>
                <Tab eventKey="dadi" title="Đã Đi">
                    {bookingsDaDi.map((booking, index) => (
                        <div key={index} onClick={() => onClick(booking._id)} className="p-2 bg-red-100 cursor-pointer m-4">
                            <div className="m-2 p-2 flex justify-between ">
                                <p>{format(new Date(booking.driverTrip.date), "yyyy-MM-dd")}  - Thời gian khởi hành {booking.driverTrip.trip.dropOffTime}</p>
                                <p className="text-green-900 fw-bold">{booking.status}</p>
                            </div>
                            <div className="m-2 p-2">{booking._id}</div>
                            <div className="m-2 p-2">{booking.driverTrip.pickupTime}</div>
                            <div className="m-2 p-2">{booking.driverTrip.fareAmount}</div>
                            <div className="m-2 p-2">{booking?.detailPickUpLocation ? booking?.detailPickUpLocation.name : 'Tại bến xuất phát'} - {booking?.detailDropOffLocation ? booking?.detailDropOffLocation.name : 'Tại Bến kết thúc'}</div>
                            <div className="m-2 p-2">Biển Số Xe: {booking.car && booking.car.license_plates ? booking.car.license_plates : 'N/A'}</div>
                        </div>
                    ))}
                </Tab>
                <Tab eventKey="dahuy" title="Đã Hủy">
                    {bookingBiHuy.map((booking, index) => (
                        <div key={index} onClick={() => onClick(booking._id)} className="p-2 bg-red-100 cursor-pointer m-4">
                            <div className="m-2 p-2 flex justify-between ">
                                <p>{format(new Date(booking.driverTrip.date), "yyyy-MM-dd")} - Thời gian khởi hành {booking.driverTrip.trip.dropOffTime}</p>
                                <p className="text-green-900 fw-bold">{booking.status}</p>
                            </div>
                            <div className="m-2 p-2">{booking._id}</div>
                            <div className="m-2 p-2">{booking.driverTrip.pickupTime}</div>
                            <div className="m-2 p-2">{booking.driverTrip.fareAmount}</div>
                            <div className="m-2 p-2">{booking?.detailPickUpLocation ? booking?.detailPickUpLocation.name : 'Tại bến xuất phát'} - {booking?.detailDropOffLocation ? booking?.detailDropOffLocation.name : 'Tại Bến kết thúc'}</div>
                            <div className="m-2 p-2">Biển Số Xe: {booking.car && booking.car.license_plates ? booking.car.license_plates : 'N/A'}</div>
                        </div>
                    ))}
                </Tab>
            </Tabs>
        </div>

    )
}

export default VeCuaToi