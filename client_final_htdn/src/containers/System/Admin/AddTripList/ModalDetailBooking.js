import { useState, useEffect } from 'react';
import BookingAPI from '../../../../api/ApiBooking';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import Modal from 'react-modal';

function ModalDetailBooking(props) {
    const [listBooking, setListBooking] = useState([]);
    const oneDriverTrip = props.data
    const [cost, setCost] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState('')

    const customStyles = {
        content: {
            width: '400px',
            margin: 'auto',

            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            backgroundColor: '#fff',
            height: '110px',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    };

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const fecthDataBooking = async (id) => {
        try {
            const data = await BookingAPI.getlist(id);
            setListBooking(data.data)
            let costTemp = 0;
            // querrry lấy tổng tiền
            for (let i = 0; i < data.data.length; i++) {
                costTemp = costTemp + data.data[i].fareAmount;
            }
            setCost(costTemp);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        fecthDataBooking(oneDriverTrip._id);
    }, []);



    const generatePDF = (id) => {
        const pdfDoc = new jsPDF();
        const fontPath = 'Kanit';
        pdfDoc.addFileToVFS('arial-unicode-ms.ttf', fontPath);
        pdfDoc.addFont('arial-unicode-ms.ttf', 'Arial Unicode MS', 'normal');
        pdfDoc.setFont('Arial Unicode MS', 'normal');

        pdfDoc.text('Your bus ticket is here! Wishing you a pleasant journey.', 10, 10);

        const selectedBooking = listBooking.find(item => item._id === id);
        console.log(selectedBooking.driverTrip.trip.pickuplocation.addressDetail)
        if (selectedBooking) {
            const lines = [
                `Customer name: ${selectedBooking.user.firstname + " " + selectedBooking.user.lastname}`,
                `Email: ${selectedBooking.user.email}`,
                `Phone number: ${selectedBooking.user.mobile}`,
                `Price: ${selectedBooking.fareAmount}`,
                `Car: ${selectedBooking.car.license_plates}`,
                `Pick-up location: ${selectedBooking.driverTrip.trip.pickuplocation.nameProvince}`,
                `Drop-off location: ${selectedBooking.driverTrip.trip.dropofflocation.nameProvince}`
            ];
            pdfDoc.setFontSize(10);

            // Add seats information
            lines.push(`Seatsss: ${selectedBooking.seats.map(item => item.numberName).join(', ')}`);

            // Add lines to PDF
            let yOffset = 20; // Initial Y-coordinate
            lines.forEach(line => {
                pdfDoc.text(line, 10, yOffset);
                yOffset += 10; // Adjust the Y-coordinate for the next line
            });
        }

        pdfDoc.save('sample.pdf');
    };


    const thanhtoan = async () => {
        const idbooking = selectedTicket
        const formdata = {
            status: 'Đã Thanh Toán, Chưa Đi'
        }
    
        // handle [API]
        if (idbooking) {
            try {
                let resp = await BookingAPI.xacnhanthanhtoantructiep(idbooking,formdata)
                alert('Cập nhật thành công nha')
            } catch (error) {
                console.error(error)
                alert('Đã có lỗi xảy ra')
            }
        }
    }


    return (
        <div>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h1 className="text-4xl font-semibold text-green-900">Thông tin chi tiết chuyến đi</h1>
                <div className="flex my-2">
                    <p className="w-1/4">Mã chuyến đi:</p>
                    <p>{oneDriverTrip._id}</p>
                </div>
                <div className="flex my-2">
                    <p className="w-1/4">Chuyến đi từ:</p>
                    <p>
                        {oneDriverTrip.trip.pickuplocation.nameProvince} - {oneDriverTrip.trip.dropofflocation.nameProvince}
                    </p>
                </div>
                <div className="flex my-2">
                    <p className="w-1/4">Ngày đi:</p>
                    <p>{moment(`${oneDriverTrip.date}`).clone().utcOffset('+07.00').format('DD-MM-YYYY')}</p>
                </div>
                <div className="flex my-2">
                    <p className="w-1/4">Giờ đi:</p>
                    <p>{oneDriverTrip.trip.pickUpTime}</p>
                </div>
                {/* <div className="flex my-2">
                    <p className="w-1/4">Giờ dự kiến đến:</p>
                    <p>{oneDriverTrip.trip.dropoffTime}</p>
                </div> */}
                <div className="flex my-2">
                    <p className="w-1/4">Được đi bởi xe:</p>
                    <p>
                        {oneDriverTrip.car.company_id.name} với biển số xe {oneDriverTrip.car.license_plates}
                    </p>
                </div>
                <div className="flex my-2">
                    <p className="w-1/4">Giá tiền cho một vé là:</p>
                    <p>{oneDriverTrip.trip.price}</p>
                </div>
                <div className="flex my-2">
                    <p className="w-1/4">Tổng tiền thu được:</p>
                    <p>{cost}</p>
                </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md my-4">
                <h1 className="text-4xl font-semibold text-green-900 my-2">Danh sách vé đã đặt</h1>
                <div className="flex my-2">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">số điện thoại</th>
                                <th className="px-4 py-2">Giá</th>
                                <th className="px-4 py-2">isProtect</th>
                                <th className="px-4 py-2">Điểm đón</th>
                                <th className="px-4 py-2">Điểm trả</th>
                                <th className="px-4 py-2">Trạng thái</th>
                                <th className="px-4 py-2">Danh sách chỗ</th>
                                <th className="px-4 py-2">In vé</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listBooking.map((item) => (
                                <tr>
                                    <td className="border px-4 py-2">{item._id}</td>
                                    <td className="border px-4 py-2">{item.user.mobile}</td>
                                    <td className="border px-4 py-2">{item.fareAmount}</td>
                                    <td className="border px-4 py-2">{item.isProtect ? 'Có' : 'Không'}</td>
                                    <td className="border px-4 py-2">

                                        {item.locationDetailPickUp ? (
                                            <>{item.locationDetailPickUp.detailLocation}, {item.locationDetailPickUp.time}</>
                                        ) : <>
                                            {item.driverTrip.trip.pickuplocation.addressDetail}
                                        </>}

                                    </td>
                                    <td className="border px-4 py-2">
                                        {item.locationDetailDropOff ? (
                                            <>{item.driverTrip.trip.dropofflocation.nameProvince}</>
                                        ) : (
                                            <>
                                                {item.driverTrip.trip.dropofflocation.addressDetail}
                                            </>)}
                                    </td>
                                    <td className="border px-4 py-2" onClick={() => {
                                        if (item.status === 'Chưa Thanh Toán') {
                                            setSelectedTicket(item._id)
                                            setIsOpen(true)
                                        }
                                    }}>{item.status}</td>
                                    <td className="border px-4 py-2">{item.seats.map(item1 => item1.numberName).join(', ')}</td>
                                    <td className="border px-4 py-2 cursor-pointer" onClick={() => generatePDF(item._id)}>ấn vào đây để in</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Xác nhận thanh toán"
            >
                <h2>Xác nhận thanh toán?</h2>
                <div>
                    <button onClick={thanhtoan} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg   px-5 py-2.5 text-center mr-2 mb-2">Thanh toán</button>
                    <button onClick={closeModal} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2">Cancel</button>
                </div>
            </Modal>

        </div>
    );
}

export default ModalDetailBooking;