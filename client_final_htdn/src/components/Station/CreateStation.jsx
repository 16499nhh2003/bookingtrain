import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import * as stationActions from "../../store/actions/stations";
import { connect } from "react-redux";
import Location from '../../components/Location'
import Swal from 'sweetalert2';


function CreateStation({ createStation }) {
    const [input, setInput] = useState({
        name: "", address: "", idProvince: "", idDistrict: "", idCommune: "", nameProvince: "", nameDistrict: "", nameCommune: "", hasCompanyPhone: false,
        companyPhone: ''
    });
    const [open, setOpen] = React.useState(false);

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

    const handleSubmit = () => {
        // console.log(input)
        createStation(input).then((result) => {
            setInput({ name: "", address: "", idProvince: "", idDistrict: "", idCommune: "", nameProvince: "", nameDistrict: "", nameCommune: "" , hasCompanyPhone: false,
            companyPhone: '' });
            setOpen(false);        
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Bến xe đã được thay đổi thành công.',
                confirmButtonText: 'OK'
            })
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Đã xảy ra lỗi!',
                footer: 'Vui lòng thử lại sau.'
            });
            console.error('Error creating station:', error);
        });

    };

    const handleLocationChange = (data) => {
        setInput(prevInput => ({
            ...prevInput,
            ...data
        }));
    }

    const handleCompanyPhoneChange = (e) => {
        setInput({
            ...input,
            hasCompanyPhone: e.target.checked
        });
    };
    return (
        <div>
            <Button
                variant="outline-primary"
                onClick={handleClickOpen}
            >
                Thêm bến xe
            </Button>
            <Modal show={open} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm bến xe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Location onLocationChange={handleLocationChange} location={() => { }} />
                    <Form>
                        <Form.Group controlId="formStationName">
                            <Form.Label>Tên bến xe</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên bến xe"
                                name="name"
                                value={input.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStationAddress">
                            <Form.Label>Địa chỉ cụ thể</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập địa chỉ cụ thể"
                                name="address"
                                value={input.address}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCompanyPhone">
                            <Form.Check
                                type="checkbox"
                                label="Có thông tin số điện thoại của công ty?"
                                checked={input.hasCompanyPhone}
                                onChange={handleCompanyPhoneChange}
                            />
                            {input.hasCompanyPhone && (
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập số điện thoại của công ty"
                                    name="companyPhone"
                                    value={input.companyPhone}
                                    onChange={handleChange}
                                />
                            )}
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

export default connect(null, stationActions)(CreateStation);
