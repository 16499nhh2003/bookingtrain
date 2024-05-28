import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import AuthenAndAuthorAPI from "../../../api/ApiAuth";
import Cookies from "js-cookie";
function ThongTinTaiKhoan() {
    const navigate = useNavigate();
    const quaylai = () => {
        navigate('/');
    }

    const [name, setName] = useState("");
    const [email, setEmail] = useState(Cookies.get("email"));
    const [point, setPoint] = useState("");

    const handleUpdatege = async () => {

        try {
            let bookingData = await AuthenAndAuthorAPI.getOne(Cookies.get("phone"));
            bookingData = bookingData.data
            setName(bookingData.firstname + bookingData.lastname);
            setPoint(bookingData.points ? bookingData.points : 1);
        } catch (error) {
            console.error('Error fetching data:', error);

        }
    }
    useEffect(() => {
        handleUpdatege();
    }, []);


    const handleUpdate = async () => {
        try {
            let formData = {}
            var nameParts = name.split(' ');
            formData.firstname = nameParts[0];
            formData.lastname = nameParts.slice(1).join(' ');
            formData.email = email
            const bookingData = await AuthenAndAuthorAPI.updateUser(Cookies.get("phone"), formData);
            Cookies.set("email", formData.email);
            alert("Cập nhật thành công");

        } catch (error) {
            console.error('Error fetching data:', error);
            alert("Cập nhật thất bại");
        }
    }

    return (
        <>
            <div className="w-full bg-slate-200 m-4 p-4">
                <button onClick={quaylai} class="bg-blue-500 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Quay Lại
                </button>
                <div>*Bổ sung đầy đủ thông tin sẽ giúp Vexere hỗ trợ bạn tốt hơn khi đặt vé</div> <br />

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="grid-first-name">
                            Số Điện Thoại:
                        </label>
                        <input value={Cookies.get("phone")} readOnly={true} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="phoneNumber" />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="grid-last-name">
                            Email:
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="text"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="grid-password">
                            Họ Và Tên:
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="text"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="grid-password">
                            Điểm tích lũy:
                        </label>
                        <input value={point} readOnly={true} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" />
                    </div>
                </div>
                <button onClick={handleUpdate} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Cập nhật thông tin
                </button>

            </div>
        </>
    );
}

export default ThongTinTaiKhoan;