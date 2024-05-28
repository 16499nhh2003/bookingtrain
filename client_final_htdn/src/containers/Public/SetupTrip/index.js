import { Container, Row, Col } from "react-bootstrap";
import { MDBRadio } from 'mdb-react-ui-kit';
import Button from "../../../components/Button2";
import config from "../../../config";
import { useState, useRef, useEffect } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useLocation } from 'react-router-dom';
import DriverTripAPI from "../../../api/ApiDriverTrip";
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
// import Xe34 from "~/components/AnhXaXe/Xe34";
// import Xe44 from "~/components/AnhXaXe/Xe44";
// import Xe22 from "~/components/AnhXaXe/Xe22";
// import Xe9 from "~/components/AnhXaXe/Xe9";
// import Xe21 from "~/components/AnhXaXe/Xe21";
// import Xe40 from "~/components/AnhXaXe/Xe40";
// import Xe32 from "~/components/AnhXaXe/Xe32";
// import Xe38 from "~/components/AnhXaXe/Xe38";
// import Xe37 from "~/components/AnhXaXe/Xe37";
import Xe24 from "../../../components/AnhXaXe/Xe24";
function SetupTrip() {
    const navigate = useNavigate();
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
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('drivertripid');
    const [iddrivertrip, setIdDrivertrip] = useState(id)
    const [driverTrip, setDriverTrip] = useState({});
    const [seats, setSeats] = useState();
    const [dropoffLocations, setdropoffLocations] = useState([]);
    const [pickupLocations, setpickupLocations] = useState([]);
    const [formData, setFormData] = useState({});


    const [selectPick, setSelectPick] = useState(null);
    const [selectDrop, setSelectDrop] = useState(null);




    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await DriverTripAPI.getone(iddrivertrip);
                console.log(data)
                data = data.data
                setDriverTrip(data);
                setSeats(data.car.typecar_id.number_seat);
                setdropoffLocations(data.trip.dropoffLocations)
                setpickupLocations(data.trip.pickupLocations)
                setFormData({
                    status: '',
                    idCar: data.car._id,
                    listIdSeat: '',
                    isProtect: false,
                    fareAmount: data.trip.price,
                    description: '',
                    phoneUser: Cookies.get('phone'),
                    idPickUp: '',
                    idDropOff: '',
                    iddriverTrip: iddrivertrip,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        click3();
    }, [iddrivertrip]);




    const click1 = () => {
        const item11 = document.getElementById("item1");
        const item22 = document.getElementById("item2");
        const item33 = document.getElementById("item3");

        if (item11 && item22 && item33) {
            const listSeat = localStorage.getItem('userState');
            if (listSeat.length === 2) {
                formData.listIdSeat = '';
                alert("Vui Lòng chọn chỗ ngồi");
                return
            }
            let resultString = listSeat.replace(/^"|"$/g, '');
            formData.listIdSeat = resultString;
            item11.style.display = "none";
            item22.style.display = "block";
            item33.style.display = "none";
        }
    }

    const click2 = () => {
        const item11 = document.getElementById("item1");
        const item22 = document.getElementById("item2");
        const item33 = document.getElementById("item3");




        if (item11 && item22 && item33) {
            if (selectPick === null || selectDrop === null) {
                alert("Vui Lòng chọn địa điểm đón và trả!");
                return;
            }
            formData.idPickUp = selectPick
            formData.idDropOff = selectDrop
            item11.style.display = "none";
            item22.style.display = "none";
            item33.style.display = "block";
        }
    }

    const click3 = () => {
        const item11 = document.getElementById("item1");
        const item22 = document.getElementById("item2");
        const item33 = document.getElementById("item3");


        if (item11 && item22 && item33) {
            item11.style.display = "block";
            item22.style.display = "none";
            item33.style.display = "none";
        }
    }





    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        openDeleteModal();
    };




    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const confirmDelete = () => {

        const jsonString = JSON.stringify(formData);
        Cookies.set("formData", jsonString);

        const pickup = driverTrip.trip.pickupLocations.find(item => item._id === formData.idPickUp);
        const dropoff = driverTrip.trip.dropoffLocations.find(item => item._id === formData.idDropOff);
        console.log(pickup, dropoff)
        const pickup1 = JSON.stringify(pickup);
        Cookies.set("pickup", pickup1);

        const dropoff1 = JSON.stringify(dropoff);
        Cookies.set("dropoff", dropoff1);
        const driverTripTEMP = driverTrip;


        const jsonString1 = JSON.stringify(driverTrip.trip);
        Cookies.set("driverTrip", jsonString1);

        const jsonString2 = JSON.stringify(driverTrip.date);
        Cookies.set("date", jsonString2);


        // console.log(pickup)
        // console.log(dropoff)

        console.log("Driver Trip Cookie:", driverTrip.trip);

        closeDeleteModal();

        navigate('/paymentpage');

    };




    const containerStyle = {
        height: '400px', // Set the desired height here
    };
    const containerStyle_ = {
        height: '290px', // Set the desired height here
    };
    const containerStyle__ = {
        height: '380px', // Set the desired height here
    };


    const handleSelectPickChange = (event) => {
        setSelectPick(event.target.value);
    };

    const handleSelectDropChange = (event) => {
        setSelectDrop(event.target.value);
    };

    const changedescription = (event) => {
        setFormData({ ...formData, description: event.target.value });
    };

    const handleCheckboxChange = () => {
        setFormData({ ...formData, isProtect: !formData.isProtect });
    };

    return (
        <Container fluid={false}>
            <Row className="">
                <Col className="bg-info">
                    <Row className="flex justify-content-center"><span className="inline-block fs-1 fw-bold">Rạng Đông</span></Row>
                    <Row >

                        <Col className="flex fw-bold">
                            <span className="fs-3">10:00</span>
                            <span className="fs-3 ml-2 mr-2">  •  </span>
                            <span>CN, 04/15/2024</span>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <span className="text-white">① Chọn Ghế</span> <span>  ━  </span>
                            <span>② Chọn Điểm Đón</span> <span>  ━  </span>
                            <span>③ Chọn Điểm Trả</span> <span>  ━  </span>
                            <span>④ Nhập Thông Tin</span>
                        </Col>
                    </Row>
                </Col>
            </Row>


            <Row>
                <Col lg={3} className="bg-white m-2">
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
                <Col className="bg-white m-2">


                    {/* CHỌN CHỖ NGỒI TRÊN XE */}

                    <div id="item1">

                        <Row className="">#

                            {seats === 24 && (
                                <Xe24 data={driverTrip} />
                            )}


                            {/* {seats === 44 && (
                                <Xe44 data={driverTrip} />
                            )}
                            {seats === 34 && (
                                <Xe34 data={driverTrip} />
                            )}
                            {seats === 22 && (
                                <Xe22 data={driverTrip} />
                            )}
                            {seats === 9 && (
                                <Xe9 data={driverTrip} />
                            )}

                            {seats === 21 && (
                                <Xe21 data={driverTrip} />
                            )}

                            {seats === 40 && (
                                <Xe40 data={driverTrip} />
                            )}
                            {seats === 32 && (
                                <Xe32 data={driverTrip} />
                            )}

                            {seats === 38 && (
                                <Xe38 data={driverTrip} />
                            )}
                            {seats === 37 && (
                                <Xe37 data={driverTrip} />
                            )} */}


                        </Row>

                        <Row className=" p-2 m-2" >
                            <Col className="flex justify-content-between">
                                <Button to={config.routes.home} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                    Quay lại
                                </Button>
                                <Button onClick={click1} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                    Tiếp tục
                                </Button>
                            </Col>

                        </Row>
                    </div>
                    {/* CHỌN CHỖ NGỒI TRÊN XE */}

                    {/* ========================= */}

                    {/* CHỌN CHỖ ĐÓN */}
                    <div id="item2">
                        <div >

                            <div class="  m-4 flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                                <svg class=" fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                                <p className=" fs-4">An tâm được đón đúng nơi, trả đúng chỗ đã chọn và dễ dàng thay đổi khi cần.</p>
                            </div>
                            <Row className="  h-630" style={containerStyle}>
                                <Col style={containerStyle__} className="bg-slate-300 m-4 p-4 !important">


                                    <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                                        <p class="fs-3">Điểm Đón</p>
                                    </div>

                                    <div style={containerStyle_} className="mt-4 overflow-auto  bg-slate-200" >


                                        {pickupLocations.map((item, index) => (
                                            <div className="m-2 p-2" key={item._id}>
                                                <span className="text-sky-500"><MDBRadio onChange={handleSelectPickChange} value={item._id} name='selectPick' id='selectPick' label={item.timePickUp} /></span>
                                                <div className="pl-10 flex m-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>
                                                    <span className="ml-4">{item.name}</span>
                                                </div>
                                            </div>

                                        ))}





                                    </div>

                                </Col>

                                <Col style={containerStyle__} className="bg-slate-300 m-4 p-4 !important">
                                    <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                                        <p class="fs-3">Điểm Trả</p>
                                    </div>

                                    <div style={containerStyle_} className="mt-4 overflow-auto  bg-slate-200" >
                                        {dropoffLocations.map((item, index) => (
                                            <div className="m-2 p-2" key={item._id}>
                                                <span className="text-sky-500"><MDBRadio onChange={handleSelectDropChange} value={item._id} name='selectDrop' id='selectDrop' label={item.timeDropOff} /></span>
                                                <div className="pl-10 flex m-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>
                                                    <span className="ml-4">{item.name}</span>
                                                </div>
                                            </div>

                                        ))}

                                    </div>

                                </Col>
                            </Row>
                        </div>

                        <Row className=" p-2 m-2" >
                            <Col className="flex justify-content-between">
                                <button onClick={click3} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                    Quay lại
                                </button>
                                <button onClick={click2} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                    Tiếp tục
                                </button>
                            </Col>

                        </Row>
                    </div>
                    {/* CHỌN CHỖ ĐÓN*/}

                    {/* ================================================================ */}
                    {/* INFO KHÁCH HÀNG */}
                    <div id="item3">

                        <Row className="">
                            <Col className="bg-slate-300 m-4 p-4">
                                <div class="  m-4 flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                                    <svg class=" fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                                    <p className=" fs-4">Chúng tôi chỉ dùng thông tin của bạn trong việc ghi nhận vé.</p>
                                </div>
                                <div>
                                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                        <label className="block text-gray-700 fs-2 font-bold mb-2">
                                            Họ tên:
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" />
                                        </label>
                                        <label className="block text-gray-700 fs-2 font-bold mb-2">
                                            Số điện thoại:
                                            <PhoneInput
                                                country={'vn'}
                                                value={formData.phoneUser}
                                            />
                                        </label>
                                        <label className="block text-gray-700 fs-2 font-bold mb-2">
                                            Email để nhận thông tin vé:
                                            <input value={Cookies.get('email')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" />
                                        </label>
                                        <label className="block text-gray-700 fs-2 font-bold mb-2">
                                            Mô tả:
                                            <input onChange={changedescription} value={formData.description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" />
                                        </label>
                                    </form>
                                </div>
                                <div className="m-4 p-4">
                                    <div className="flex">
                                        <img src="https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/icon_protect_trip.svg" alt="icon_protect_trip" />
                                        <p className="ml-4 mr-4 fw-bold">Bảo hiểm chuyến đi</p>
                                        <span>(+20.000đ/ghế)</span>
                                    </div>
                                    <span>Được bồi thường lên đến 400.000.000đ/ghế.Cung cấp bởi <span className="text-cyan-500">Bảo Việt</span> x <span className="text-cyan-500">Saladin</span></span>
                                    <label className="ml-4 text-rose-700">
                                        <input checked={formData.isProtect || false} type="checkbox" onChange={handleCheckboxChange} /> Đăng ký bảo hiểm
                                    </label>
                                </div>
                                <div className="ml-4 pl-4 border-2 border-teal-700">
                                    <div >
                                        <p className="fw-bold">Bảo Hiểm Tai Nạn</p>
                                        <span>Quyền lợi bảo hiểm lên đến 400 triệu đồng khi xảy ra tai nạn</span>
                                    </div>
                                    <div>
                                        <p className="fw-bold">Bảo hiểm hủy chuyến</p>
                                        <span>Bồi thường 100% tiền vé nếu chuyến đi bị hủy bởi các lí do khách quan hoặc bất khả kháng về sức khỏe.</span>
                                    </div>
                                    <div className="text-orange-500">Bồi thường trực tuyến nhanh chóng, dễ dàng</div>
                                </div>



                            </Col>

                        </Row>

                        <Row className=" p-2 m-2" >
                            <Col className="flex justify-content-between">
                                <button onClick={click1} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                    Quay lại
                                </button>
                                <button onClick={() => handleDelete()} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                    Thanh Toán
                                </button>
                            </Col>

                        </Row>
                    </div>


                </Col>
            </Row>

            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={closeDeleteModal}
                style={customStyles}
                contentLabel="Delete Confirmation Modal"
            // Thêm các kiểu và các thuộc tính khác theo mong muốn
            >
                <h2>Bạn có chắc chắc muốn thanh toán chuyến đi này?</h2>
                <div>
                    <button onClick={confirmDelete} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg   px-5 py-2.5 text-center mr-2 mb-2">Xác Nhận</button>
                    <button onClick={closeDeleteModal} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2">Hủy</button>
                </div>
            </Modal>

        </Container>
    );
}

export default SetupTrip;