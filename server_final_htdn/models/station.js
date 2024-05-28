const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
    idProvince: {
        type: String,
        required: true,
    },
    idDistrict: {
        type: String,
        required: true,
    },
    idCommune: {
        type: String,
        required: true,
    },
    nameProvince: {
        type: String,
        require: true
    },
    nameDistrict: {
        type: String,
        require: true
    },
    nameCommune: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    addressDetail: {
        type: String,
        require: true
    },
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        require: false
    },
});

stationSchema.pre('save', function (next) {
    const station = this;
    station.addressDetail = `${station.address}, ${station.nameCommune}, ${station.nameDistrict}, ${station.nameProvince}`;
    next();
});

// stationSchema.pre('updateOne', function(next) {
//     const station = this;
//     console.log(station)
//     station.addressDetail = `${station.address}, ${station.nameCommune}, ${station.nameDistrict}, ${station.nameProvince}`;
//     next();
// });

const Station = mongoose.model('Stations', stationSchema);


module.exports = Station;