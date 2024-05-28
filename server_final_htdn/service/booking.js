const Booking_Model = require('../models/booking')
const DriverTrip_Model = require('../models/driver_trip')


// huy chuyen
// service huy chuyen cap nhat trang thai ve  ,  cap nhat so ghe trong chuyen xe 
const updateBooking = ({ id }) => new Promise(async (resolve, reject) => {
    try {

        const booking = await Booking_Model.findByIdAndUpdate(id, {
            status: 'Đã Hủy'
        }, { new: true });

        if (booking) {
            const idDrivertrip = booking.driverTrip;
            let drivertrip = await DriverTrip_Model.findById(idDrivertrip);

            // danh sách các ghế của vé này
            let seatOfBooking = booking.seats;

            // các ghế đã đặt của các vé trong chuyến đi này
            let seatBooking = drivertrip.seats_bookings;
            seatBooking = seatBooking.filter(item => !seatOfBooking.includes(item))

            // cập nhật lại các ghế của chuyến đi
            drivertrip = await DriverTrip_Model.findByIdAndUpdate(idDrivertrip, { seats_bookings: seatBooking }, { new: true })
            resolve(drivertrip)
        }

        reject(new Error('Error'))
    } catch (error) {
        reject(error);
    }
});

module.exports = {
    updateBooking
}