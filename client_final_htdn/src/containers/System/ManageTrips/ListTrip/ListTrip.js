import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, InputGroup, Form, Pagination } from 'react-bootstrap';
import moment from 'moment'
import { TiEdit, TiDelete } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { path } from '../../../../utils/constanst';
import { ApiTrip } from '../../../../api'
import Swal from 'sweetalert2'



const ListTrip = ({ trips, onchangeData, onKeyWord }) => {
    const [keyword, setKeyword] = useState('');
    const [tripsList, setTripsList] = useState([])
    const [viewDetail, setViewDetail] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(trips)
        setTripsList(trips)
    }, [trips])

    const handleViewDetail = (trip) => {
        setViewDetail(trip);
    };
    const handleCloseDetail = () => {
        setViewDetail(null);
    };

    const handleEdit = (trip) => {
        navigate(`/he-thong/${path.EDIT_TRIP}/${trip._id}`);
    };

    const handleDelete = async (trip) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `You want to delete trip ! ${trip.pickuplocation?.nameProvince + '-' + trip.dropofflocation?.nameProvince}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const response = await ApiTrip.deleteOne(trip._id);
                if (response.status === 200) {
                    onchangeData(true)
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Failed to delete trip.",
                        icon: "error"
                    });
                }
            } catch (error) {
                console.error("Error deleting trip:", error);
                Swal.fire({
                    title: "Error",
                    text: "An error occurred while deleting the trip.",
                    icon: "error"
                });
            }
        }
    };

    const handleSearch = async () => {
        onKeyWord(keyword)
    }

    const handleTrip  = (id) => {
        
    }


    return (
        <>
            <InputGroup className='m-2'>
                <Form.Control
                    className='text-xl'
                    placeholder="Search route"
                    aria-label="Recipient's username with two button addons"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                />
                <Button variant="outline-secondary" onClick={handleSearch}>Search</Button>
            </InputGroup>

            <h1 className='text-xl'>Danh sách các chuyến xe</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Điểm xuất phát</th>
                        <th>Điểm dừng chân</th>
                        <th>Thời gian khởi hành</th>
                        <th>Thời gian kết thúc</th>
                        <th>Giá tiền</th>
                        <th>Tên công ty</th>
                        <th>Số điện thoại liên hệ</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tripsList.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center">Không có tuyến đường nào</td>
                        </tr>
                    ) :
                        (tripsList.map((trip) => (
                            <tr key={trip._id}>
                                <td onClick={() => handleViewDetail(trip)}><img src={trip.imagePath} alt={`Trip ${trip._id + 1}`} style={{ width: '100px' }} /></td>
                                <td onClick={() => handleViewDetail(trip)}>{trip.pickuplocation?.nameProvince}-{trip.pickuplocation?.nameDistrict}</td>
                                <td onClick={() => handleViewDetail(trip)}>{trip.dropofflocation?.nameProvince}-{trip.dropofflocation?.nameDistrict}</td>
                                <td>{moment(trip.pickUpTime).format('llll')}</td>
                                <td>{moment(trip.dropOffTime).format('llll')}</td>
                                <td>{new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(trip.price)}</td>
                                <td>{trip.idCompany?.name}</td>
                                <td>{trip.idCompany?.phone}</td>
                                <td>
                                    <TiEdit onClick={() => handleEdit(trip)} />
                                    <TiDelete onClick={() => handleDelete(trip)} />
                                    <TiDelete onClick={() => handleTrip(trip._id)} />
                                </td>
                            </tr>
                        )))}
                </tbody>
            </Table>

            {viewDetail && (
                <Modal show={viewDetail !== null} onHide={handleCloseDetail}>
                    <Modal.Header closeButton>
                        <Modal.Title>Trip Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Điểm đón:</strong> {`${viewDetail.pickuplocation.nameProvince}-${viewDetail.pickuplocation.nameDistrict}-${viewDetail.pickuplocation.nameCommune}`}</p>
                        <p><strong>Điểm trả:</strong> {`${viewDetail.dropofflocation.nameProvince}-${viewDetail.dropofflocation.nameDistrict}-${viewDetail.dropofflocation.nameCommune}`}</p>
                        <p><strong>Thời gian đón:</strong> {moment(viewDetail.pickUpTime).format('llll')}</p>
                        <p><strong>Thời gian trả:</strong> {moment(viewDetail.dropOffTime).format('llll')}</p>
                        <p><strong>Giá tiền:</strong> {new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(viewDetail.price)}</p>
                        <p><strong>Trạng thái:</strong> {viewDetail.statusActive ? 'Đang hoạt động' : 'Ngưng hoạt động'}</p>
                        <img src={viewDetail.imagePath} alt={`Trip ${viewDetail._id}`} style={{ maxWidth: '100%' }} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={handleCloseDetail}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default ListTrip;
