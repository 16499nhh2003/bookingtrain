import { Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames/bind';
import Button from '../../../components/Button2';
import config from '../../../config';
import images from '../../../assets/logo.png';
import Cookies from 'js-cookie';
import './Header.css'
import routes from '../../../config/routes';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };


    const handleLogout = () => {
        // Thực hiện các công việc đăng xuất ở đây, ví dụ: xóa cookies
        Cookies.remove('phone');
        Cookies.remove('dropoff');
        Cookies.remove('role');
        Cookies.remove('email');
        Cookies.remove('pickup');
        Cookies.remove('driverTrip');
        Cookies.remove('refresh_token');
        Cookies.remove('formData');
        Cookies.remove('access_token');
        // Đóng modal
        setIsModalOpen(false);
        alert("Đăng xuất thành công!")
        navigate('/')
    };
    const company_ = Cookies.get('role');

    const inforuser = () => {
        setIsModalOpen(false);
        navigate('/infouser')
    }

    const doimatkhau = () => {
        setIsModalOpen(false);
        navigate('/doimatkhau')
    }

    const vecuatoi = () => {
        setIsModalOpen(false);
        navigate('/vecuatoi')
    }

    const back = () => {
        navigate('/')
    }

    const handleLoginCompany = () => {
        navigate(`${routes.LoginCompany}`)
    }

    return (
        <Row className='m-3'>
            <Col xs lg='3' className='flex justify-content-center'>
                <span className='cursor-pointer' onClick={back}>
                    <img src={images.logo} alt='Logo' />
                </span>
                <h2 className='text-uppercase ml-4 pt-5 fw-bold text-light'>
                    Cam kết hoàn 150% nếu nhà xe không giữ vé
                </h2>
            </Col>
            <Col className='flex justify-content-between text-black pt-5 fw-bold'>
                <h3>Tiếp bước ước mơ</h3>
                <h3>Quản lý đơn hàng</h3>
                <h3>Mở bán vé trên Vexere</h3>
                <h3 onClick={handleLoginCompany}>Đăng nhập phía nhà xe</h3>
            </Col>
            <Col xs lg='2' pt='6' ml='5' className='mt-4'>
                {company_ ? (
                    <img
                        onClick={toggleModal}
                        src='https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/user_profile.svg'
                        className='w-[32px] h-[32px] cursor-pointer'
                    />
                ) : (
                    <Button
                        to={config.routes.login}
                        type='button'
                        class='bg-red-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    >
                        Login
                    </Button>
                )}

                {isModalOpen && (
                    <div
                        id='select-modal'
                        tabIndex='-1'
                        aria-hidden='true'
                        className=' fixed   z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden'
                    >
                        <div className='relative p-4 w-full max-w-md max-h-full'>
                            <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                                <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
                                    <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                                        Open positions
                                    </h3>
                                    <button
                                        onClick={toggleModal}
                                        type='button'
                                        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                                    >
                                        <svg
                                            className='w-3 h-3'
                                            aria-hidden='true'
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 14 14'
                                        >
                                            <path
                                                stroke='currentColor'
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                                stroke-width='2'
                                                d='M1 5h12m0 0L9 1m4 4L9 9'
                                            />
                                        </svg>
                                        <span className='sr-only'>Close modal</span>
                                    </button>
                                </div>

                                <div className='p-4 md:p-5'>
                                    <div onClick={inforuser} className='flex items-center mb-3  p-2 cursor-pointer'>
                                        <img
                                            src='https://229a2c9fe669f7b.cmccloud.com.vn/images/Auth/account-circle.svg'
                                            width='24'
                                            height='16'
                                            alt=''
                                            className='mr-2'
                                        />
                                        <span>Thông tin tài khoản</span>
                                    </div>
                                    <div onClick={vecuatoi} className='flex items-center mb-3  p-2 cursor-pointer'>
                                        <img
                                            src='https://229a2c9fe669f7b.cmccloud.com.vn/images/ticket.svg'
                                            width='24'
                                            height='16'
                                            alt=''
                                            className='mr-2'
                                        />
                                        <span>Vé của tôi</span>
                                    </div>
                                    <div className='flex items-center mb-3  p-2 cursor-pointer'>
                                        <img
                                            src='https://229a2c9fe669f7b.cmccloud.com.vn/images/loyalty.svg
                        '
                                            width='24'
                                            height='16'
                                            alt=''
                                            className='mr-2'
                                        />
                                        <span>Thành viên tháng</span>
                                    </div>
                                    <div className='flex items-center mb-3  p-2 cursor-pointer'>
                                        <img
                                            src='https://229a2c9fe669f7b.cmccloud.com.vn/images/promotion.svg'
                                            width='24'
                                            height='16'
                                            alt=''
                                            className='mr-2'
                                        />
                                        <span>Ưu đãi</span>
                                    </div>
                                    <div onClick={doimatkhau} className='flex items-center mb-3  p-2 cursor-pointer'>
                                        <img
                                            src='https://229a2c9fe669f7b.cmccloud.com.vn/images/credit-card.svg'
                                            width='24'
                                            height='16'
                                            alt=''
                                            className='mr-2'
                                        />
                                        <span>Đổi Mật Khẩu</span>
                                    </div>
                                    <div className='flex items-center mb-3  p-2 cursor-pointer'>
                                        <img
                                            src='https://229a2c9fe669f7b.cmccloud.com.vn/images/review.svg'
                                            width='24'
                                            height='16'
                                            alt=''
                                            className='mr-2'
                                        />
                                        <span>Nhận xét chuyến đi</span>
                                    </div>
                                    <div className='flex items-center mb-3  p-2 cursor-pointer' onClick={handleLogout}>
                                        <img
                                            src='	https://229a2c9fe669f7b.cmccloud.com.vn/images/Auth/logout.svg'
                                            width='24'
                                            height='16'
                                            alt=''
                                            className='mr-2'
                                        />
                                        <span>Đăng xuất</span>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                )}
            </Col>
        </Row>
    );
};

export default Header;
