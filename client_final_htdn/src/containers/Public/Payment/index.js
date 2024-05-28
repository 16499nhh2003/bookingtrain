// import React from 'react';
// import { useLocation } from 'react-router-dom';
// // import images from '~/assets/images/vnpay-logo.png';

// function Payment() {
//     const location = useLocation();
//     const { state } = location;

//     // Bây giờ bạn có thể truy cập dữ liệu từ state, ví dụ:
//     const paymentId = state ? state.id : "";
//     const paymentprice = state ? state.amount : "";
//     return (
//         <div className="container mx-auto mt-5">
//             <div className="flex justify-center">
//                 <div className="w-1/2">
//                     <div className="bg-white rounded-lg shadow-md p-6">
//                         {/* <img src={images} style={{ width: '200px' }} alt="VNPay Logo" /> */}
//                         <h2 className="text-4xl m-4 font-bold">Thanh Toán Đơn Hàng</h2>
//                         <form action="http://localhost:8883/submitOrder" method="post">
//                             <div className="mb-4">
//                                 <label htmlFor="amount" className="block text-4xl m-4 font-medium text-gray-600">
//                                     Số tiền:  VNĐ
//                                 </label>
//                                 <input
//                                     type="number"
//                                     className="form-input border-2 border-indigo-600 text-2xl m-4  block w-full"
//                                     id="amount"
//                                     name="amount"
//                                     required
//                                     value={paymentprice}
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="orderInfo" className="block text-4xl m-4 font-medium text-gray-600">
//                                     Thông tin đơn hàng: {paymentId}
//                                 </label>
//                                 <input
//                                     type="text"
//                                     className="form-input border-2 border-indigo-600 text-2xl m-4 block w-full"
//                                     id="orderInfo"
//                                     name="orderInfo"
//                                     required
//                                     value={`Thanh toan don hang :${paymentId}`}
//                                 />
//                             </div>
//                             <button type="submit" className="bg-blue-500 m-4  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                                 Thanh toán
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Payment;