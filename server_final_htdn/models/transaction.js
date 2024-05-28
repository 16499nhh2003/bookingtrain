const mongoose = require('mongoose'); // Erase if already required

let  transactionSchema = new mongoose.Schema({
    amount: {type: Number,},
    status: {type: String},
    transdate: {type: String},
    trantype: {type: String},
    orderId : {type : String},
    booking: {type: mongoose.Types.ObjectId, ref: 'Booking',}
}, {
    timestamps: true
});
module.exports = mongoose.model('Transaction', transactionSchema);