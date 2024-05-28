import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginForm.css'
import { SiGmail } from "react-icons/si";
import axios from 'axios';


const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');


    const handleForgotPassword = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user/forgotpassword`, {
                email: email,
            });
            if (response.data.success) {
                alert('Success: Sent email successfully. Please log in.');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error while sent email:', error);
            alert('Error: Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="wrapper">
            <form>
                <h1>Quên mật khẩu</h1>
                <div className="input-box">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <SiGmail className="icon" />
                </div>

                <button onClick={handleForgotPassword}>Xác nhận</button>
                <div className="register-link">
                    <p>You already have an account? <a href="/login">Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
