import React, { useState, useEffect } from "react";
import { Button, Form, FormControl, InputGroup, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import * as stationActions from "../../store/actions/stations";
import * as tripActions from "../../store/actions/trips";
import StationSelect from "../../components/StationSelect"
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";



function CreateTrip(props) {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        fromStation: "",
        toStation: "",
        startTime: "",
        price: "",
        companyPhoneNumber: "",
        dropOffTime: "",
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) =>
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });

    useEffect(() => {
        cookie();
        props.getStations();
    }, []);

    // hàm xử lí cookie
    const cookie = () => {
        const company_ = Cookies.get('company');
        if (company_) {
            const userObject = JSON.parse(company_);
            setInput(prevState => ({ ...prevState, companyPhoneNumber: userObject.phone }))
            console.log(input)
        }
        else {
            console.log(' >>> redirect ')
            navigate('/')
        }

    }

    const handleSubmit = (e) => {

        // setInput(prev => ({...prev , fromStation :  prev.fromStation.value , toStation  : prev.toStation.value}))
        props.createTrip(input).then((result) => {
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Bến xe đã được tạo thành công.',
                confirmButtonText: 'OK'
            })
            setInput({ fromStation: "", toStation: "", startTime: "", price: "", hasCompanyStations: false, companyPhoneNumber: ""  , dropOffTime: ""});
            setOpen(false);
        }).catch((err) => {
            // console.log(err.response.data.msg)
            console.error('Error creating trips :', err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Đã xảy ra lỗi!',
                footer: 'Vui lòng thử lại sau. ' + err.response.data.msg
            });
        });;

    };

    return (
        <div>
            <Button variant="outline-primary" onClick={handleClickOpen}>
                Thêm tuyến đường
            </Button>

            <Modal show={open} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới tuyến đường</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="companyPhoneNumber">
                            <Form.Label>Số điện thoại nhà xe</Form.Label>
                            <Form.Control
                                type="text"
                                name="companyPhoneNumber"
                                readOnly
                                value={input.companyPhoneNumber}
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
                            <Form.Label>Bến dừng</Form.Label>
                            <StationSelect
                                value={input.toStation}
                                options={props.stations?.results?.map((elm) => ({ value: elm._id, label: elm.name }))}
                                onChange={(selectedOption) => setInput({ ...input, toStation: selectedOption })}
                            />
                        </Form.Group>

                        <Form.Group controlId="startTime">
                            <Form.Label>Giờ khởi hành</Form.Label>
                            <Form.Control
                                type="time"
                                name="startTime"
                                value={input.startTime}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="dropOffTime">
                            <Form.Label>Giờ kết thúc</Form.Label>
                            <Form.Control
                                type="time"
                                name="dropOffTime"
                                value={input.dropOffTime}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Giá tiền</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={input.price}
                                    onChange={handleChange}
                                />
                            </InputGroup>
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

const mapDispatchToProp = (dispatch) => {
    return {
        getStations: () => dispatch(stationActions.getStations()),
        createTrip: (tripData) => dispatch(tripActions.createTrip(tripData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProp)(CreateTrip);
