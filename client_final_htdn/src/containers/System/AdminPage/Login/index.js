import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AuthenAndAuthorAPI from '../../../../api/ApiAuth';

function LoginForm() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = React.useState(null);
    const [loginStatus, setLoginStatus] = useState(null);

    const formToJson = (formData) => {
        const jsonObject = {};
        formData.forEach((value, key) => {
            jsonObject[key] = value;
        });
        return JSON.stringify(jsonObject);
    };

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
        // You can handle the form submission logic here
        if (formLogin.mobile === '' || formLogin.password === '') {
            alert("Không thể đăng nhập");
            return;
        }
        const regex = /^0\d+/;
        if (regex.test(formLogin.mobile)) {
        } else {
            alert("Số điện thoại phải bắt đầu bằng 0");
            return;
        }
        const jsonData = formToJson(new FormData(e.target));
        AuthenAndAuthorAPI.authenticatePhone(JSON.parse(jsonData))
            .then((response) => {
                response = response.data
                const token = response.accessToken;
                const userData = response.userData;

                if (userData.role !== "admin") {
                    alert("Đây là trang ADMIN bạn không được vào!");
                    // navigate('/');
                    return;
                }
                Cookies.set('access_token', token, { expires: 7 });
                Cookies.set('refresh_token', userData.refreshToken, { expires: 7 });
                Cookies.set('role', userData.role, { expires: 7 });
                Cookies.set('mobile', userData.mobile, { expires: 7 });
                Cookies.set('email', userData.email, { expires: 7 });
                if (userData.role === "admin") {
                    setLoginStatus("success");
                } else {
                    setLoginStatus("order");
                }

                console.log(loginStatus)
                // You can handle the response here, e.g., redirect or display a success message.
            })
            .catch((error) => {
                setLoginStatus("faile");
            });
        setShowModal(true);

    };





    const handlekhithanhcongorthatbai = () => {
        setShowModal(false)
        if (loginStatus === 'success') {
            navigate('/he-thong');
        }
        setShowModal(null)
    };
















    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className=" h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Flowbite
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit_} method="POST">
                            <div>
                                <label htmlFor="mobile" className="block mb-2  font-medium text-gray-900 dark:text-white">Your mobile Number ADMIN</label>
                                <input
                                    type="mobile"
                                    name="mobile"
                                    id="mobile"
                                    value={formLogin.mobile}
                                    onChange={handleInputChangeLogin}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm: rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="mobile number"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2  font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formLogin.password}
                                    onChange={handleInputChangeLogin}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm: rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>

                            <button type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5  font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                            <p className=" font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>





            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl text-pink-700 font-semibold">
                                        THÔNG BÁO
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">

                                    {loginStatus === 'order' && (
                                        <p>Bạn Không có quyền vào trang này</p>
                                    )}
                                    {loginStatus === 'success' && (
                                        <p>Đăng nhập thành công! Chúc bạn có một trải nghiệm vui vẻ với VEXERE</p>
                                    )}

                                    {loginStatus === 'faile' && (
                                        <p>Đăng nhập thất bại! Vui lòng thử lại!</p>
                                    )}


                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handlekhithanhcongorthatbai}
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}





        </section>
    );
}

export default LoginForm;