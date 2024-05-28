import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
function PaymentFailed(props) {
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
        <div className="container mx-auto mt-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Đơn hàng không thành công</h2>
                <p className="text-red-500 mb-4">Thật không may, đơn đặt hàng của bạn không được xử lý.</p>
                <p>Vui lòng kiểm tra thông tin thanh toán của bạn và thử lại.</p>
                <button onClick={vetrangchu} className="btn btn-primary">Quay về Trang chủ</button>

                {orderId && (
                    <div>
                        <p>Order ID: {orderId}</p>
                    </div>
                )}
                {totalPrice && (
                    <div>
                        {/* <p>Total Price: {JSON.parse(Cookies.get("formData")).fareAmount}</p> */}
                    </div>
                )}
                {paymentTime && (
                    <div>
                        <p>Payment Time: {currentDate.toDateString()}</p>
                    </div>
                )}
                {transactionId && (
                    <div>
                        <p>Transaction ID: {transactionId}</p>
                    </div>
                )}
            </div>

        </div>
    );
}

export default PaymentFailed;