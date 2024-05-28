const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

var bookingSchema = new mongoose.Schema({
    bookingDate: { type: Date, required: true },
    fareAmount: { type: Number, required: true },
    isProtect: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    description: { type: String },
    detailPickUpLocation: { type: Schema.Types.ObjectId, ref: 'DetailPickUpLocation' },
    detailDropOffLocation: { type: Schema.Types.ObjectId, ref: 'DetailDropOffLocation' },
    driverTrip: { type: Schema.Types.ObjectId, ref: 'DriverTrip' },
    seats: [{ type: Schema.Types.ObjectId, ref: 'Seats' }],
    car: { type: Schema.Types.ObjectId, ref: 'Car' },
    status: { type: String, }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);