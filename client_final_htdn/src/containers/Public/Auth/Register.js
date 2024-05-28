import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginForm.css'
import { FaLock, FaUser, FaPhone } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import axios from "axios";


const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');

    const handleRegister = () => {
        if (!email || !password || !name || !mobile) {
            alert('Error: Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('Error: Password and Confirm Password do not match');
            return;
        }

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user/register`, {
            email: email,
            password: password,
            name: name,
            mobile: mobile
        })
            .then(response => {
                console.log('Register successful:', response.data);
                alert('Success: Your account has been successfully registered. Please check your email for verification code.');
                navigate('/verify-code');
            })
            .catch(error => {
                console.error('Registration error:', error);
                alert('Error: Registration failed. Please try again.');
            });
    };


    return (
        <div className="wrapper">
            <form>
                <h1>Register</h1>
                <div className="input-box">
                    <input type="text" name="username" placeholder="UserName" value={name} onChange={(e) => setName(e.target.value)} required />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <SiGmail className="icon" />
                </div>
                <div className="input-box">
                    <input type="text" name="phone" placeholder="Phone Number" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                    <FaPhone className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <FaLock className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <FaLock className="icon" />
                </div>

                <div className="remember-forgot">
                    <a href="/verify-code">Verify Code?</a>
                </div>

                <button onClick={handleRegister}>Register</button>
                <div className="register-link">
                    <p>You already have an account? <a href="/login">Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default Register;
