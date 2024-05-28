import React, { useState } from 'react';
import ApiAuth from '../../../../api/ApiAuth';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import ApiCompany from '../../../../api/ApiCompany';

function Login() {
    const navigate = useNavigate();
    const [formLogin, setFormLogin] = useState({
        mobile: '',
        password: '',
    });
    const handleInputChangeLogin = (e) => {
        const { name, value } = e.target;
        setFormLogin({
            ...formLogin,
            [name]: value,
        });
    };
    const handleSubmit_ = (e) => {
        e.preventDefault();
        ApiAuth.authenticatePhone(formLogin)
            .then((response) => {
                const { accessToken  , userData} = response.data
                if (userData.role === "owner" || userData.role === "staff") {
                    console.log("OK");
                } else {
                    alert("Đây là trang của nhà xe bạn không được vào!");
                    navigate('/');
                    return;
                }

                Cookies.set('access_token', accessToken, { expires: 7 });
                Cookies.set('refresh_token', userData.refreshToken, { expires: 7 });
                Cookies.set('role', userData.role, { expires: 7 });
                Cookies.set('phone', userData.mobile, { expires: 7 });
                Cookies.set('email', userData.email, { expires: 7 });

                ApiCompany.getCompanyByUser(formLogin.mobile)
                    .then((response) => {
                        const company = JSON.stringify(response.data);
                        Cookies.set('company', company , { expires: 7 });
                    })
                    .catch((error) => {

                    });
                navigate('/he-thong');
            })
            .catch((error) => {
                console.log(error)
            });

    }
    return (
        <div className=" relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">

                <h1 className="fs-1 text-3xl font-semibold text-center text-purple-700 underline">
                    Trang Đăng Nhập Nhà Xe
                </h1>
                <form className="mt-6" onSubmit={handleSubmit_} method="POST">
                    <div className="mb-2">
                        <label
                            for="phone"
                            className="block  font-semibold text-gray-800"
                        >
                            Số điện thoại
                        </label>
                        <input
                            id="mobile"
                            name="mobile"
                            type="tel"
                            value={formLogin.mobile}
                            onChange={handleInputChangeLogin}
                            required
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="password"
                            className="blockfont-semibold text-gray-800"
                        >
                            Mật khẩu
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formLogin.password}
                            onChange={handleInputChangeLogin}
                            required
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <a
                        href="#"
                        className=" text-purple-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5  font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}

                </p>
            </div>
        </div>
    );
}

export default Login;