import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginForm.css'
import { SiGmail } from "react-icons/si";
import { FaQrcode } from "react-icons/fa6";
import axios from 'axios';


const Verification = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [verifyCode, setVerifyCode] = useState('');

    const handleVerifyCode = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user/register/verify`, {
                email: email,
                confirmationCode: verifyCode
            });
            if (response.data.success) {
                alert('Success: Verification code entered successfully. Please log in.');
                navigate('/login');
            } else {
                alert('Error: ' + response.data.mes);
            }
        } catch (error) {
            console.error('Error while verifying code:', error);
            alert('Error: Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="wrapper">
            <form>
                <h1>Verification Code</h1>
                <div className="input-box">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <SiGmail className="icon" />
                </div>
                <div className="input-box">
                    <input type="number" placeholder="Verify Code" value={verifyCode} onChange={(e) => setVerifyCode(e.target.value)} required />
                    <FaQrcode className="icon" />
                </div>

                <div className="remember-forgot">
                    <a href="/forgot-password">Forgot Password?</a>
                </div>

                <button onClick={handleVerifyCode}>Xác nhận</button>
                <div className="register-link">
                    <p>You already have an account? <a href="/login">Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default Verification;
