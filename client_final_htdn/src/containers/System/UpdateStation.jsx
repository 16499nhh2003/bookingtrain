import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import * as stationActions from "../../store/actions/stations";
import Location from '../../components/Location'
import Swal from 'sweetalert2';

function UpdateStation(props) {
    const [input, setInput] = useState({ name: "", address: "", idProvince: "", idDistrict: "", idCommune: "", nameProvince: "", nameDistrict: "", nameCommune: "" });
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) =>
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });

    useEffect(() => {
        const { name, address, idProvince, idDistrict, idCommune, nameProvince, nameDistrict, nameCommune } = props.station;
        setInput({ name, address, idProvince, idDistrict, idCommune, nameProvince, nameDistrict, nameCommune });
    }, [props.station]);

    const onSubmit = (e) => {
        const { _id } = props.station;
        props.updateStation(_id, input).then((result) => {
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Chuyễn xe đã được tạo thành công.',
                confirmButtonText: 'OK'
            })
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Đã xảy ra lỗi!',
                footer: 'Vui lòng thử lại sau.'
            });
            console.error('Error creating trips :', err);
        });
        handleClose();
    };

    const handleLocationChange = (data) => {
        setInput(prevInput => ({
            ...prevInput,
            ...data
        }));
    }

    return (
        <div>
            <Button
                variant="outline-primary"
                onClick={handleShow}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M11.063 0.75a1.75 1.75 0 0 1 1.238.512l2.949 2.95a1.75 1.75 0 0 1 0 2.474L5.53 15.963a1.75 1.75 0 0 1-2.475 0l-2.95-2.95a1.75 1.75 0 0 1-.511-1.237V4.78a1.75 1.75 0 0 1 .75-1.44l7.5-4.5a1.75 1.75 0 0 1 1.238-0.512zM14.5 3.78l-7.5 4.5v5.5a.25.25 0 0 0 .25.25h5.5l4.5-7.5-2.75-2.75zM10.186 1.25L2.936 8.5l1.06 1.06 7.25-7.25-1.06-1.06z" />
                </svg>
                Cập nhật
            </Button>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật bến xe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Location onLocationChange={handleLocationChange} location={input} />
                        <Form.Group controlId="name">
                            <Form.Label>Tên bến xe</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="address">
                            <Form.Label>Địa chỉ cụ thể</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={input.address}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="outline-primary" onClick={onSubmit}>
                        Lưu thay đổi
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

const mapDispatchToProps = (dispatch) => {
    return {
        updateStation: (id, data) => dispatch(stationActions.updateStation(id, data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStation);
