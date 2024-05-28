import { Row, Col } from "react-bootstrap";
import { React, useEffect, useState } from 'react';
import BookingForm from './BookingForm';
import DriverTripAPI from "../../../../api/ApiDriverTrip";
import { useLocation } from 'react-router-dom';
import Button from "../../../../components/Button2";
import config from "../../../../config";
import Xe34 from "../../../../components/AnhXaXe/Xe34";
import Xe44 from "../../../../components/AnhXaXe/Xe44";
import Xe22 from "../../../../components/AnhXaXe/Xe22";
import Xe9 from "../../../../components/AnhXaXe/Xe9";
import Xe37 from "../../../../components/AnhXaXe/Xe37";
import Xe38 from "../../../../components/AnhXaXe/Xe38";
import Xe32 from "../../../../components/AnhXaXe/Xe32";
import Xe40 from "../../../../components/AnhXaXe/Xe40";
import Xe21 from "../../../../components/AnhXaXe/Xe21";
import Xe24 from "../../../../components/AnhXaXe/Xe24";


function Book() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('driverTrip');
    const idtrip = searchParams.get('idtrip');
    const [driverTrip, setDriverTrip] = useState();
    const [seats, setSeats] = useState();
    const [listSeatSelected, setListSeatSelected] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await DriverTripAPI.getone(id);
                setDriverTrip(data.data);
                setSeats(data.data.seats.length);
            } catch (error) {
                console.error('Error f  etching data:', error);
            }
        };
        fetchData();
    }, []);



    return (
        <div>
            <Button to={`${config.routes.ListTrip}?tripId=${idtrip}`} class="bg-blue-500 hover:bg-blue-700 text-white font-bold  py-2 px-4 rounded">
                Quay Lại
            </Button>
            <Row className="mt-4">
                <Col lg={6}>
                    <Row>
                        <Col className="flex">
                            <h1 className="m-2 fs-2 fw-bold mb-4">CHÚ THÍCH</h1>
                            <div className="flex">
                                <svg className="bg-info p-1" width="32" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.75" y="2.75" width="22.5" height="34.5" rx="2.25" fill="#FFF" stroke="#B8B8B8" stroke-width="1.5" stroke-linejoin="round"></rect><rect x="5.75" y="27.75" width="16.5" height="6.5" rx="2.25" fill="#FFF" stroke="#B8B8B8" stroke-width="1.5" stroke-linejoin="round"></rect><path class="icon-selected" d="M14 8.333A6.67 6.67 0 0 0 7.333 15 6.67 6.67 0 0 0 14 21.667 6.67 6.67 0 0 0 20.667 15 6.669 6.669 0 0 0 14 8.333zm-1.333 10L9.334 15l.94-.94 2.393 2.387 5.06-5.06.94.946-6 6z" fill="transparent"></path><path class="icon-disabled" d="M18.96 11.46l-1.42-1.42L14 13.59l-3.54-3.55-1.42 1.42L12.59 15l-3.55 3.54 1.42 1.42L14 16.41l3.54 3.55 1.42-1.42L15.41 15l3.55-3.54z" fill="transparent"></path></svg>
                                <p className="m-2 p-2">Còn Trống</p>
                            </div>

                            <div className="flex">
                                <svg className="bg-danger p-1" width="32" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.75" y="2.75" width="22.5" height="34.5" rx="2.25" fill="#FFF" stroke="#B8B8B8" stroke-width="1.5" stroke-linejoin="round"></rect><rect x="5.75" y="27.75" width="16.5" height="6.5" rx="2.25" fill="#FFF" stroke="#B8B8B8" stroke-width="1.5" stroke-linejoin="round"></rect><path class="icon-selected" d="M14 8.333A6.67 6.67 0 0 0 7.333 15 6.67 6.67 0 0 0 14 21.667 6.67 6.67 0 0 0 20.667 15 6.669 6.669 0 0 0 14 8.333zm-1.333 10L9.334 15l.94-.94 2.393 2.387 5.06-5.06.94.946-6 6z" fill="transparent"></path><path class="icon-disabled" d="M18.96 11.46l-1.42-1.42L14 13.59l-3.54-3.55-1.42 1.42L12.59 15l-3.55 3.54 1.42 1.42L14 16.41l3.54 3.55 1.42-1.42L15.41 15l3.55-3.54z" fill="transparent"></path></svg>
                                <p className="m-2 p-2">Đã Bán</p>
                            </div>

                            <div className="flex">
                                <svg className="bg-success p-1" width="32" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.75" y="2.75" width="22.5" height="34.5" rx="2.25" fill="#FFF" stroke="#B8B8B8" stroke-width="1.5" stroke-linejoin="round"></rect><rect x="5.75" y="27.75" width="16.5" height="6.5" rx="2.25" fill="#FFF" stroke="#B8B8B8" stroke-width="1.5" stroke-linejoin="round"></rect><path class="icon-selected" d="M14 8.333A6.67 6.67 0 0 0 7.333 15 6.67 6.67 0 0 0 14 21.667 6.67 6.67 0 0 0 20.667 15 6.669 6.669 0 0 0 14 8.333zm-1.333 10L9.334 15l.94-.94 2.393 2.387 5.06-5.06.94.946-6 6z" fill="transparent"></path><path class="icon-disabled" d="M18.96 11.46l-1.42-1.42L14 13.59l-3.54-3.55-1.42 1.42L12.59 15l-3.55 3.54 1.42 1.42L14 16.41l3.54 3.55 1.42-1.42L15.41 15l3.55-3.54z" fill="transparent"></path></svg>
                                <p className="m-2 p-2">Đang Chọn</p>
                            </div>
                        </Col>
                    </Row>

                    <>
                        {seats === 24 && (
                            <Xe24 data={driverTrip} listSeatSelected={listSeatSelected} />
                        )}
                        {seats === 44 && (
                            <Xe44 data={driverTrip} listSeatSelected={listSeatSelected} />
                        )}
                        {seats === 34 && (
                            <Xe34 data={driverTrip} listSeatSelected={listSeatSelected} />
                        )}
                        {seats === 22 && (
                            <Xe22 data={driverTrip} listSeatSelected={listSeatSelected} />
                        )}
                        {seats === 9 && (
                            <Xe9 data={driverTrip} listSeatSelected={listSeatSelected} />
                        )}

                        {seats === 21 && (
                            <Xe21 data={driverTrip} listSeatSelected={listSeatSelected} />
                        )}

                        {seats === 40 && (
                            <Xe40 data={driverTrip} listSeatSelected={listSeatSelected} />
                        )}
                        {seats === 32 && (
                            <Xe32 data={driverTrip} listSeatSelected={listSeatSelected} />
                        )}

                        {seats === 38 && (
                            <Xe38 data={driverTrip} listSeatSelected={listSeatSelected} />
                        )}
                        {seats === 37 && (
                            <Xe37 data={driverTrip} listSeatSelected={listSeatSelected} />
                        )}

                    </>

                </Col>

                <Col>
                    <div className="container mx-auto mt-8">
                        <h1 className="text-4xl font-semibold mb-4">Booking Form</h1>
                        <BookingForm booking={driverTrip} />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Book;