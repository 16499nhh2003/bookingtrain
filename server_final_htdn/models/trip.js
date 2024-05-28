const mongoose = require('mongoose'); // Erase if already required
const moment = require('moment');

var tripSchema = new mongoose.Schema({
    dropofflocation: {type: mongoose.Schema.Types.ObjectId, ref: 'Stations'},
    pickuplocation: {type: mongoose.Schema.Types.ObjectId, ref: 'Stations'},
    pickUpTime: {type: String},
    dropOffTime: {type: String},
    price: {type: Number, required: true},
    statusActive: {type: String, enum: ['active', 'inactive'], default: 'active'},
    promotion: {type: mongoose.Schema.Types.ObjectId, ref: 'Promotion',},
    imagePath: [{
        type: String,
        default: 'https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/5/img_hero.png?v1'
    }],
    idCompany: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    pickupLocations: [{type: mongoose.Schema.Types.ObjectId, ref: 'DetailPickUpLocation'}],
    dropoffLocations: [{type: mongoose.Schema.Types.ObjectId, ref: 'DetailDropOffLocation'}],
    driverTrips: [{type: mongoose.Schema.Types.ObjectId, ref: 'DriverTrip'}],
    distance: {type: Number, require: false, default: 100},
    duration: {type: String, require: true, default: 100},
}, {
    timestamps: true
});


module.exports = mongoose.model('Trip', tripSchema);