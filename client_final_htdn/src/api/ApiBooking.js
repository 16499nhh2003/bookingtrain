import axiosClient from "../axiosConfig";

const BookingAPI = {
    getlist: (iddriverttrip) => {
        const url = `/api/booking/trip?iddrivertrip=${iddriverttrip}`;
        return axiosClient.get(url);
    },
    addOneBooking: (body) => {
        const url = `/api/booking`;
        return axiosClient.post(url, body);
    }
    ,
    getlistBookingByUser: (phone) => {
        const url = `/api/booking/user?mobile=${phone}`;
        return axiosClient.get(url);
    },
    getlistPaymentbyIdBooking: (id) => {
        const url = `/api/user/payment/${id}`;
        return axiosClient.get(url);
    },
    getone: (id) => {
        const url = `/api/booking/one/${id}`;
        return axiosClient.get(url);
    },
    // refund: (bookingid, orderId, amountt, transDate, user) => {
    //     const url = `/api/v1/user/refund?bookingid=${bookingid}&orderId=${orderId}&amountt=${amountt}&transDate=${transDate}&user=${user}`;
    //     return axiosClient.post(url);
    // },
    promotion: (idtrip, code) => {
        const url = `/api/v1/staff/promotion/byCodeAndTripId/${code}/${idtrip}`;
        return axiosClient.get(url);
    },
    vnpay: (data) => {
        const url = `/api/booking/create_payment_url`
        return axiosClient.post(url, data)
    },
    huychuyen: (id) => {
        const url = `/api/booking/update-status/${id}`
        return axiosClient.put(url)
    },
    refund: (id, formdata) => {
        const url = `/api/booking/refund?idpay=${id}`
        return axiosClient.post(url, formdata)
    },
    xacnhanthanhtoantructiep: (id, formdata) => {
        const url = `/api/booking/update/booking/${id}`
        return axiosClient.put(url, formdata)
    },

    // ADMIN 
    laythongtindoanhthu : (phone) => { 
        const url = `/api/payment/revenue/${phone}`
        return axiosClient.get(url)
    },
}

export default BookingAPI;