import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import * as tripActions from "../../store/actions/trips";
import * as stationActions from "../../store/actions/stations";
import StationSelect from "../../components/StationSelect"
import Swal from 'sweetalert2';
import { BsPencil } from "react-icons/bs";
function UpdateTrip(props) {
    const [input, setInput] = useState({
        fromStation: {},
        toStation: {},
        startTime: "",
        price: "",
        hasCompanyStations: false,
        companyPhoneNumber: "",
        dropOffTime  :""
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }
    useEffect(() => {
        const { trip } = props;
        const { dropofflocation, pickuplocation, pickUpTime, price , idCompany , dropOffTime } = trip;
        setInput({ fromStation: { value: pickuplocation._id, label: pickuplocation.name }, toStation: { value: dropofflocation._id, label: dropofflocation.name }, startTime: pickUpTime, price , companyPhoneNumber : idCompany.phone , dropOffTime });
        props.getStations();
    }, []);


    const handleSubmit = (e) => {
        const { trip } = props; 
    
        props.updateTrip(trip._id, input).then((result) => {
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Cập nhật đã thành công.',
                confirmButtonText: 'OK'
            })
            setOpen(false);
        }).catch((err) => {
            alert('Cập nhật thất bại')

        });;
    };

    return (
        <div>
            <Button variant="outline-info" style={{ marginRight: "10px" }} onClick={handleClickOpen} >
                <BsPencil /> Sửa
            </Button>
            <Modal show={open} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới chuyến xe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="companyPhoneNumber">
                            <Form.Label>Số điện thoại nhà xe</Form.Label>
                            <Form.Control
                                type="text"
                                name="companyPhoneNumber"
                                value={input.companyPhoneNumber}
                                readOnly
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="fromStation">
                            <Form.Label>Bến xuất phát</Form.Label>
                            <StationSelect
                                value={input.fromStation}
                                options={props.stations?.results?.map((elm) => ({ value: elm._id, label: elm.name }))}
                                onChange={(selectedOption) => setInput({ ...input, fromStation: selectedOption })}
                            />
                        </Form.Group>

                        <Form.Group controlId="toStation">
                            <Form.Label>Bến dung</Form.Label>
                            <StationSelect
                                value={input.toStation}
                                options={props.stations?.results?.map((elm) => ({ value: elm._id, label: elm.name }))}
                                onChange={(selectedOption) => setInput({ ...input, toStation: selectedOption })}
                            />
                        </Form.Group>

                        <Form.Group controlId="startTime">
                            <Form.Label>Thời gian khởi hành</Form.Label>
                            <Form.Control
                                type="time"
                                name="startTime"
                                value={input.startTime}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="dropOffTime">
                            <Form.Label>Thời gian kết thúc</Form.Label>
                            <Form.Control
                                type="time"
                                name="dropOffTime"
                                value={input.dropOffTime}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Giá tiền</Form.Label>
                            <Form.Control type="number" name="price" value={input.price} onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="outline-primary" onClick={handleSubmit}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        stations: state.stations,
    };
};

export default connect(mapStateToProps, { ...stationActions, ...tripActions })(UpdateTrip);
