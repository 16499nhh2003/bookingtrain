const mongoose = require('mongoose'); // Erase if already required

var seatsSchema = new mongoose.Schema({
    numberName: { type: String },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    // driverTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DriverTrip' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Seats', seatsSchema);