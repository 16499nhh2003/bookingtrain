import { Col, Container, Row } from 'react-bootstrap';
import Button from '../Button2';
// import images from '~/assets/images/index';
import config from '../../config';
import { useState, useEffect } from "react";
import moment from 'moment'

function InfoTrip(props) {
    // console.log(props)
    const [driverTrip, setDriverTrip] = useState(props.data); 
    return (
        <Container className='bg-white m-5 p-2'>
            <Row className=''>
                <Col><img
                    src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/5/img_hero.png?v1'
                    alt="new"
                />
                </Col>
                <Col lg={4}>
                    <Row><Col> <p className='fw-bold fs-2'>{driverTrip.car.company_id.name}</p></Col></Row>
                    <Row><Col>Số chỗ ngồi  : {driverTrip.car.typecar_id.type_name}</Col></Row>
                    <br></br>
                    <Row><Col className='flex'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg><p className='pl-2'>{driverTrip.trip.pickUpTime} •{driverTrip.trip.pickuplocation.addressDetail} </p></Col></Row>
                    <Row><Col><span className='ml-10 pl-4 text-secondary'>Thời gian đi : Khoảng 90p</span></Col></Row>
                    <Row><Col className='flex'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg><p className='pl-2'>{driverTrip.trip.dropOffTime} • {driverTrip.trip.dropofflocation.addressDetail}</p></Col></Row>
                </Col>
                <Col lg={2} className='position-relative'><span className='absolute bottom-0 right-8 text-primary'>Thông tin chi tiết</span></Col>
                <Col className='position-relative'>
                    <Row className='absolute top-0 right-6 text-primary fs-1 fw-bold'><Col>{driverTrip.trip.price} VNĐ</Col></Row>
                    <Row className='absolute bottom-0 right-6'><Col>
                        <div>
                            <span className='mr-4 text-secondary'>
                                {driverTrip.seats.length - driverTrip.seats_bookings.length > 0 ? `Còn ${driverTrip.seats.length - driverTrip.seats_bookings.length} ghế`  :  ' Hết ghế'}
                            </span>
                            <Button to={`/${config.routes.Setuptrip}?drivertripid=${driverTrip._id}`} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant='outline-primary'>Chọn tuyến</Button>
                        </div>
                    </Col></Row>
                </Col>
            </Row>
            <Row className='m-4'>
                <div className='flex justify-content-between'>
                    <h3><span className='text-danger'>* </span>Vé chặng thuộc chuyến {moment(driverTrip.date).format('DD-MM-yyyy')} {driverTrip.trip.pickuplocation.nameProvince} - {driverTrip.trip.dropofflocation.nameProvince}</h3>
                    <h1>KHÔNG CẦN THANH TOÁN TRƯỚC</h1>
                </div>
            </Row>
        </Container>
    );
}

export default InfoTrip;