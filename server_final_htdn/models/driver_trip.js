const mongoose = require('mongoose');

var driverTripSchema = new mongoose.Schema({
    date: { type: Date },
    status: { type: Boolean },
    trip: { type: mongoose.Types.ObjectId, ref: 'Trip', },
    car: { type: mongoose.Types.ObjectId, ref: 'Car', },
    // danh sách các lần đặt vé
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    // danh sách tài xế của chuyến xe
    userDriverTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserDriverTrip' }],
    // danh sách các ghế của chuyến xe
    seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seats' }],
    // danh sách các ghế đã đặt
    seats_bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seats' }]
}, {
    timestamps: true
});


module.exports = mongoose.model('DriverTrip', driverTripSchema);