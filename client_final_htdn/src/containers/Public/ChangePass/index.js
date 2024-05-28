import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthenAndAuthorAPI from "../../../api/ApiAuth";
import Cookies from "js-cookie";
function DoiMatKhau() {
    const navigate = useNavigate();
    const quaylai = () => {
        navigate('/');
    }

    const [currentPass, setCurrentPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");


    const doi = async () => {
        if (newPass !== confirmPass) {
            alert("Mật khẩu mới và xác nhận mật khẩu không khớp. Vui lòng kiểm tra lại.");
            return;
        }
        try {
            console.log(Cookies.get("phone"), newPass, currentPass)
            const bookingData = await AuthenAndAuthorAPI.changePassword(Cookies.get("phone"), newPass, currentPass);
            alert(bookingData.data.message);

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
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="grid-password">
                            Mật Khẩu Hiện Tại:
                        </label>
                        <input
                            value={currentPass}
                            onChange={(e) => setCurrentPass(e.target.value)}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="current-password"
                            type="password"
                            placeholder="********"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="grid-first-name">
                            Mật Khẩu mới:
                        </label>
                        <input
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="new-password"
                            type="password"
                            placeholder="********"
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="grid-last-name">
                            Xác Nhận Mật Khẩu mới:
                        </label>
                        <input
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="confirm-password"
                            type="password"
                            placeholder="**********"
                        />
                    </div>
                </div>

                <button onClick={doi} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Xác Nhận
                </button>

            </div>
        </>
    );
}

export default DoiMatKhau;