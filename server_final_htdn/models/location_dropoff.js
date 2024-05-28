const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dropoffSchema = new Schema({
    name: {type: String, maxlength: 255},
    timeDropOff: {type: String},
    trip: {type: mongoose.Schema.Types.ObjectId, ref: 'Trip'}
});
const Dropoff = mongoose.model('DetailDropOffLocation', dropoffSchema);
module.exports = Dropoff;