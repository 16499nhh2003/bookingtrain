const mongoose = require('mongoose');
const Schema = mongoose.Schema;// Erase if already required

var companySchema = new mongoose.Schema({
    phone: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    desc: {type: String, required: true},
    email: {type: String, required: true},
    isStatus: {type: Boolean, default: false},
    vnp_TmnCode: {type: String},
    vnp_HashSecret: {type: String},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    cars: [{type: Schema.Types.ObjectId, ref: 'Car'}],
    trips: [{type: Schema.Types.ObjectId, ref: 'Trip'}],
    promotions: [{type: Schema.Types.ObjectId, ref: 'Promotions'}],

    // user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true}

}, {
    timestamps: true
});

module.exports = mongoose.model('Company', companySchema);