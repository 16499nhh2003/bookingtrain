// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './LoginForm.css'
// import { FaLock } from "react-icons/fa";
// import { SiGmail } from "react-icons/si";
// import axios from "axios";

// const Login = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLogin = async () => {
//         if (!email || !password) {
//             alert('Error: Please enter email and password');
//             return;
//         }

//         try {
//             const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user/login`, {
//                 email: email,
//                 password: password,
//             });
//             console.log('Login successful:', response.data);
//             alert('Success: Login successfully.');
//             navigate('/');
//         } catch (error) {
//             console.error('Login error:', error);
//             alert('Error: Login failed. Please try again.');
//         }
//     };

//     return (
//         <div className="wrapper">
//             <form action="">
//                 <h1>Login</h1>
//                 <div className="input-box">
//                     <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                     <SiGmail className="icon" />
//                 </div>
//                 <div className="input-box">
//                     <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                     <FaLock className="icon" />
//                 </div>

//                 <div className="remember-forgot">
//                     <a href="/forgot-password">Forgot Password?</a>
//                 </div>

//                 <button onClick={handleLogin}>Login</button>
//                 <div className="register-link">
//                     <p>Don't have an account? <a href="/register">Register</a></p>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Login;
