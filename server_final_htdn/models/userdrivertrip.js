const mongoose = require('mongoose');
const userDriverTripSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    driverTrip: { type: mongoose.Schema.Types.ObjectId, ref: 'DriverTrip' },
    status: { type: Boolean },
    date: { type: Date }
});

module.exports = mongoose.model('UserDriverTrip', userDriverTripSchema);