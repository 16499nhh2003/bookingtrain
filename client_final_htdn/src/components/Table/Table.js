import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { UpdateCarForm } from '../../containers/System/ManageCar';
import { FaChair } from 'react-icons/fa';
import Seat from '../Seat/Seat.jsx'

import './style.css';
const Table = ({ data, isTableCar, onEdit, onDelete }) => {
    const generateSampleSeats = () => {
        const seats = [];
        const seatCount = 14;
        for (let i = 1; i <= seatCount; i++) {
            seats.push({ _id: `${i}`, name: `A${i}`, isOccupied: Math.random() < 0.5 });
        }
        return seats;
    };
    const sampleSeats = generateSampleSeats();


    const [selectedRow, setSelectedRow] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [typeModal, setTypeModal] = useState(null);

    const openModal = (row, type) => {
        setSelectedRow(row);
        setModalOpen(true);
        setTypeModal(type);
    };

    const closeModal = () => {
        setSelectedRow(null);
        setModalOpen(false);
    };

    return (
        <div className="overflow-hidden">
            <table className="table table-striped">
                <thead className="bg-gray-50">
                    {isTableCar && (
                        <tr>
                            <th>License Plates</th>
                            <th>Type of Car</th>
                            <th>Company</th>
                            <th>Availability</th>
                        </tr>
                    )}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {isTableCar && data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="cursor-pointer hover:bg-gray-100 transition-colors">
                            <td>{row.license_plates}</td>
                            <td>{row.typecar_id.type_name}</td>
                            <td>{row.company_id?.name} -{row.company_id?.phone} </td>
                            <td>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${row.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {row.availability ? 'Không còn hoạt động' : 'Đang hoạt động'}
                                </span>
                            </td>
                            <td>
                                <Button className="text-indigo-600 hover:text-indigo-900 mr-2" onClick={() => openModal(row, 'detail')}>
                                    <FaEye className="inline-block h-6 w-6" />
                                </Button>
                                <Button className="text-indigo-600 hover:text-indigo-900 mr-2" onClick={(e) => openModal(row, 'edit')}>
                                    <FaEdit className="inline-block h-6 w-6" />
                                </Button>
                                <Button className="text-red-600 hover:text-red-900" onClick={(e) => openModal(row, 'delete')}>
                                    <FaTrash className="inline-block h-6 w-6" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isTableCar && typeModal === 'detail' && modalOpen && (
                <Modal show={modalOpen} onHide={closeModal} dialogClassName="modal-xl">
                    <Modal.Header closeButton>
                        <Modal.Title>Chi tiết</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-7">
                                <p><strong>Biển số xe:</strong> {selectedRow.license_plates}</p>
                                <p><strong>Loại xe:</strong> {selectedRow.typecar}</p>
                                <p><strong>Công ty:</strong> {selectedRow.company}</p>
                                <p><strong>Tình trạng:</strong> {selectedRow.availability ? 'Còn hoạt động' : 'Không còn hoạt động'}</p>
                                <h3>Hình ảnh</h3>
                                <div className="row row-cols-2 g-4">
                                    {selectedRow.images.map((image, index) => (
                                        <div key={index} className="col">
                                            <img src={image} className="img-fluid rounded-lg" alt={`Ảnh xe ${index}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-md-5">
                                <h3>Ghế ngồi</h3>
                                <div className="row row-cols-1 row-cols-md-3 g-4">
                                    {sampleSeats.map((seat, index) => (
                                        <div key={index} className="col">
                                            <Seat isOccupied={seat.isOccupied} />
                                            <p>{seat.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={closeModal}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {isTableCar && typeModal === 'edit' && modalOpen && (
                <Modal show={modalOpen} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Car</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UpdateCarForm onSubmit={onEdit} selectedRow={selectedRow} onEdit={onEdit} />
                    </Modal.Body>
                </Modal>
            )}

            {isTableCar && typeModal === 'delete' && modalOpen && (
                <Modal show={modalOpen} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Car</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete license plates: {selectedRow.license_plates}?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => onDelete(selectedRow._id)}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default Table;
