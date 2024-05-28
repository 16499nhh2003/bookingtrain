import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const PaymentSuccess = (props) => {
    const { orderId, totalPrice, paymentTime, transactionId } = props;
    const navigate = useNavigate();
    const currentDate = new Date();
    const vetrangchu = () => {
        Cookies.remove("dropoff");
        Cookies.remove("driverTrip");
        Cookies.remove("formData");
        Cookies.remove("pickup");
        Cookies.remove("dropoff");
        navigate("/")
    }
    return (
        <div className="bg-body py-5">
            <div className="container">
                <div className="w-50 m-auto">
                    <h1 className="my-3 text-success fw-bold text-6xl text-center">Payment Successful</h1>
                    <h2 className="my-2 text-4xl">Order Details</h2>
                    <table className="table table-bordered">
                        <tbody>

                            <tr>
                                <td>Total Price:</td>
                                {/* <td>{JSON.parse(Cookies.get("formData")).fareAmount}</td> */}
                            </tr>
                            <tr>
                                <td>Payment Time:</td>
                                <td>{currentDate.toDateString()}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={vetrangchu} className="btn btn-primary">Back to Homepage</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;