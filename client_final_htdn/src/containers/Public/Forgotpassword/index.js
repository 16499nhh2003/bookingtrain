import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AuthenAndAuthorAPI from "../../../api/ApiAuth";

const Forgot = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const send = async () => {
        try {
            const data = await AuthenAndAuthorAPI.forgotPass(email);
            alert(data.data.message)
            navigate("/login")
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const cancel = () => {
        navigate("/login")
    }
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgotpassword</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={() => { }} method="POST">
                    <input
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Nhập Email Của Bạn Vào Đây"
                        aria-label="Email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <button
                        onClick={send}
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded"
                        type="button"
                    >
                        Gửi
                    </button>
                    <button
                        onClick={cancel}
                        className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 py-1 px-2 rounded"
                        type="button"
                    >
                        Cancel
                    </button>
                </form>

            </div>
        </div>
    );
}

export default Forgot;

