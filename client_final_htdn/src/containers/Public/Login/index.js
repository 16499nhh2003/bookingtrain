import React, { useState } from 'react';
import AuthenAndAuthorAPI from '../../../api/ApiAuth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,

} from 'mdb-react-ui-kit';


function Login() {
    const [showModal, setShowModal] = React.useState(null);
    const [loginStatus, setLoginStatus] = useState(null);

    const navigate = useNavigate();
    const [justifyActive, setJustifyActive] = useState('tab1');

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }
        setJustifyActive(value);
    };

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
        if (formLogin.mobile === '' || formLogin.password === '') {
            alert("Password and confirm password do not match");
            return;
        }

        const phoneNumberPattern = /^0\d+/;
        if (!phoneNumberPattern.test(formLogin.mobile)) {
            alert("Số điện thoại không hợp lệ");
            return;
        }
        // const jsonData = formToJson(new FormData(e.target));
        // console.log(jsonData)
        AuthenAndAuthorAPI.authenticatePhone(formLogin)
            .then((response) => {
                setLoginStatus('success');
                Cookies.set('access_token', response.data.access_token, { expires: 7 });
                Cookies.set('role', response.data.userData.role, { expires: 7 });
                Cookies.set('phone', response.data.userData.mobile, { expires: 7 });
                Cookies.set('email', response.data.userData.email, { expires: 7 });
            })
            .catch((error) => {
                console.error(error)
                setLoginStatus('failure');
            });
        setShowModal(true)
    };

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        mobile: '',
        email: '',
        password: '',
        confirmpassword: '',
        role: 'user',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlekhithanhcongorthatbai = () => {
        setShowModal(false)
        if (loginStatus === 'success') {
            navigate('/');
        }
        if (loginStatus === 'successeregister'){
            setJustifyActive('tab3')
        }

            setShowModal(null)
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // You can handle the form submission logic here
        if (formData.password !== formData.confirmpassword) {
            alert("Password and confirm password do not match");
            return;
        }

        const phoneNumberPattern = /^0[0-9]{9}$/;
        if (!phoneNumberPattern.test(formData.mobile)) {
            alert("Số điện thoại không hợp lệ");
            return;
        }
        formData.role = 'user';
        // const jsonData = formToJson(new FormData(e.target));
        AuthenAndAuthorAPI.register(formData)
            .then((response) => {
                console.log('Registration successful:', response);
                setLoginStatus('successeregister');
            })
            .catch((error) => {
                console.error('Registration failed:', error);
                setLoginStatus('failureregister');
            });
        setShowModal(true)
    };

    const forgot = () => {
        navigate("/forgot")
    }


    const [formVerify, setFormVerify] = useState({
        email: '',
        confirmationCode: ''
    })

    const handleInputChangeVerify = (e) => {
        const { name, value } = e.target;
        setFormVerify({
            ...formVerify,
            [name]: value,
        });
    };

    const handleSubmit__ = (e) => {
        e.preventDefault();
        // const jsonData = formToJson(new FormData(e.target));
        AuthenAndAuthorAPI.verify(formVerify)
            .then((response) => {
                console.log(response)
                alert('Confirmation successful. Your account is now verified.')
                setJustifyActive('tab1')
            })
            .catch((e) => {
                alert('Code không đúng')
            })
    }
    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <MDBTabs pills justify className="mb-3 d-flex flex-row justify-content-between">
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                        Login
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                        Register
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab3')} active={justifyActive === 'tab3'}>
                        Verifycode
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
                <MDBTabsPane open={justifyActive === 'tab1'}>
                    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={handleSubmit_} method="POST">
                                <div>
                                    <label htmlFor="mobile" className="block  font-medium leading-6 text-gray-900">Phone Number</label>
                                    <div className="mt-2">
                                        <input
                                            name="mobile"
                                            type="tel"
                                            value={formLogin.mobile}
                                            onChange={handleInputChangeLogin}
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block  font-medium leading-6 text-gray-900" >Password</label>

                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={formLogin.password}
                                            onChange={handleInputChangeLogin}
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5  font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        Sign in
                                    </button>
                                </div>
                            </form>
                            <div className="">
                                <span onClick={forgot} className=" cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</span>
                            </div>

                            <p className="mt-10 text-center  text-gray-500">
                                Not a member?
                                <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
                            </p>
                        </div>
                    </div>

                </MDBTabsPane>
                <MDBTabsPane open={justifyActive === 'tab2'}>
                    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />

                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register an Account</h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="firstname" className="block  font-medium leading-6 text-gray-900">
                                        Firstname
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="firstname"
                                            name="firstname"
                                            type="text"
                                            value={formData.firstname}
                                            onChange={handleInputChange}
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="lastname" className="block  font-medium leading-6 text-gray-900">
                                        LastName
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="lastname"
                                            name="lastname"
                                            type="text"
                                            value={formData.lastname}
                                            onChange={handleInputChange}
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="mobile" className="block  font-medium leading-6 text-gray-900">
                                        Phone
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="mobile"
                                            name="mobile"
                                            type="tel"
                                            value={formData.mobile}
                                            onChange={handleInputChange}
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block  font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block  font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block  font-medium leading-6 text-gray-900">
                                        Confirm Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="confirmpassword"
                                            name="confirmpassword"
                                            type="password"
                                            value={formData.confirmpassword}
                                            onChange={handleInputChange}
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5  font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </MDBTabsPane>
                <MDBTabsPane open={justifyActive === 'tab3'}>
                    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Verifycode</h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={handleSubmit__} method="POST">
                                <div>
                                    <label htmlFor="email" className="block  font-medium leading-6 text-gray-900">Nhập tài khoản email đã đăng ký</label>
                                    <div className="mt-2">
                                        <input
                                            name="email"
                                            type="email"
                                            value={formVerify.email}
                                            onChange={handleInputChangeVerify}
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="confirmationCode" className="block  font-medium leading-6 text-gray-900" >Mã xác nhận</label>

                                    </div>
                                    <div className="mt-2">
                                        <input
                                            name="confirmationCode"
                                            type="text"
                                            value={formVerify.confirmationCode}
                                            onChange={handleInputChangeVerify}
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5  font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        Xác nhận
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </MDBTabsPane>
            </MDBTabsContent>

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

                                    {loginStatus === null && (
                                        <p>Loading ...!</p>
                                    )}
                                    {loginStatus === 'success' && (
                                        <p>Đăng nhập thành công! Chúc bạn có một trải nghiệm vui vẻ với VEXERE</p>
                                    )}

                                    {loginStatus === 'failure' && (
                                        <p>Đăng nhập thất bại! Vui lòng thử lại!</p>
                                    )}

                                    {loginStatus === 'successeregister' && (
                                        <p>Đăng kí thành công! Vui lòng vào email để xác nhận tài khoản</p>
                                    )}

                                    {loginStatus === 'failureregister' && (
                                        <p>Đăng kí thất bại! Vui lòng thử lại!</p>
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

        </MDBContainer>
    );
}

export default Login;