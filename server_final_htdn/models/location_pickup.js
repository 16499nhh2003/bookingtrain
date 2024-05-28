const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailPickUpLocationSchema = new mongoose.Schema({
    name: {type: String},
    timePickUp: {type: String},
    trip: {type: mongoose.Schema.Types.ObjectId, ref: 'Trip'}
});

const DetailPickUpLocation = mongoose.model('DetailPickUpLocation', detailPickUpLocationSchema);
module.exports = DetailPickUpLocation;
