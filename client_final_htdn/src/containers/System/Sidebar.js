import React from 'react'
import anonAvatar from '../../assets/anon-avatar.png'
import { useSelector, useDispatch } from 'react-redux'
import menuSidebar from '../../utils/menuSidebar'
import { NavLink, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import { AiOutlineLogout } from 'react-icons/ai'
import Cookies from 'js-cookie';

const activeStyle = 'hover:bg-gray-200 flex  rounded-md items-center gap-2 py-2 font-bold bg-gray-200'
const notActiceStyle = 'hover:bg-gray-200 flex  rounded-md items-center gap-2 py-2 cursor-pointer'

const Sidebar = () => {

    const role = 'staff';
    const navigate = useNavigate()
    const handleLogout = () => {
        Cookies.remove('phone');
        Cookies.remove('dropoff');
        Cookies.remove('role');
        Cookies.remove('email');
        Cookies.remove('pickup');
        Cookies.remove('driverTrip');
        Cookies.remove('refresh_token');
        Cookies.remove('formData');
        Cookies.remove('access_token');
        alert("Đăng xuất thành công!")
        navigate('/')
    };

    const dispatch = useDispatch()
    const { currentData } = useSelector(state => state.user)
    return (
        <div className='w-[256px] flex-none p-4 flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <img src={anonAvatar} alt="avatar" className='w-12 h-12 object-cover rounded-full border-2 border-white' />
                    <div className='flex flex-col justify-center'>
                        <span className='font-semibold'>{currentData?.name}</span>
                        <small>{currentData?.phone}</small>
                    </div>
                </div>
                <span  >Role: {role}</span>
            </div>
            <div>

                {
                    true && menuSidebar.map(item => {
                        return (
                            <NavLink
                                className={({ isActive }) => isActive ? activeStyle : notActiceStyle}
                                key={item.id}
                                to={item?.path}
                            >
                                {item?.icon}
                                {item.text}
                            </NavLink>
                        )
                    })
                }

                {/* {role === 'owner' && menuSidebar.filter(item =>
                    item.id != 2 &&
                    item.id != 7
                ).map(item => {
                    return (
                        <NavLink
                            className={({ isActive }) => isActive ? activeStyle : notActiceStyle}
                            key={item.id}
                            to={item?.path}
                        >
                            {item?.icon}
                            {item.text}
                        </NavLink>
                    )
                })}

                {role === 'admin' && menuSidebar.filter(item =>
                    item.id == 2 ||
                    item.id == 7
                ).map(item => {
                    return (
                        <NavLink
                            className={({ isActive }) => isActive ? activeStyle : notActiceStyle}
                            key={item.id}
                            to={item?.path}
                        >
                            {item?.icon}
                            {item.text}
                        </NavLink>
                    )
                })}

                {role === 'staff' && menuSidebar.filter(item =>
                    item.id == 3 ||
                    item.id == 4 ||
                    item.id == 5
                ).map(item => {
                    return (
                        <NavLink
                            className={({ isActive }) => isActive ? activeStyle : notActiceStyle}
                            key={item.id}
                            to={item?.path}
                        >
                            {item?.icon}
                            {item.text}
                        </NavLink>
                    )
                })}

                {role === 'driver' && (
                    <NavLink
                        className={({ isActive }) => isActive ? activeStyle : notActiceStyle}
                        key={1}
                        to={1}
                    >
                        {'Chưa triển khai cho tài xế'}
                    </NavLink>
                )} */}
                <span onClick={handleLogout} className={notActiceStyle}><AiOutlineLogout />Đăng xuất</span>
            </div>
        </div>
    )
}

export default Sidebar
