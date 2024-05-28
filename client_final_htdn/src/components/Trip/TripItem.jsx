import React, { Component } from "react";
import { connect } from "react-redux";
import * as tripActions from "../../store/actions/trips";
import moment from "moment";
import { BsTrash, BsPencil } from "react-icons/bs";
import UpdateTrip from "../../containers/System/UpdateTrip";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import config from "../../config";
import Button2 from '../Button2'
import { Modal, Button } from 'react-bootstrap';
import CreatePickUpForm from "./CreatePickUpForm";
class TripItem extends Component {
    state = {
        showModal: false
    };
    handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Chưa triển khai xóa.",
                    icon: "success"
                });
            }
        });
    }


    handleOpenModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    handleViewLocate = (id) => {
        this.setState({ showModal: true });
    }



    render() {
        const { trip, index } = this.props;
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{trip._id}</td>
                <td>{trip.pickuplocation?.nameProvince} - {trip.dropofflocation?.nameProvince}</td>
                <td>{trip.pickuplocation?.name}</td>
                <td>{trip.dropofflocation?.name}</td>
                <td>{moment(trip.pickUpTime, "HH:mm").format("hh:mm A")}</td>
                <td>{moment(trip.pickUpTime, "HH:mm").format("hh:mm A")}</td>
                <td>{new Intl.NumberFormat("vi-VN").format(trip.price)} đ</td>
                <td>{trip.idCompany?.name} - {trip.idCompany?.phone}</td>
                <td style={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="outline-danger" style={{ marginRight: "10px" }} onClick={() => this.handleDelete(trip._id)}>
                        <BsTrash /> Xóa
                    </Button>
                    <UpdateTrip trip={trip} />
                    <Button2 to={`${config.routes.ListTrip}?tripId=${trip._id}`} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant='outline-primary'>
                        Đặt
                    </Button2>
                </td>
            </tr>
        );
    }
}

export default connect(null, tripActions)(TripItem);
