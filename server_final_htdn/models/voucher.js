const mongoose = require('mongoose'); // Erase if already required
const randomstring = require('randomstring');

var voucherSchema = new mongoose.Schema({
    voucher_code: {
        type: String,
        default: function () {
            return randomstring.generate({
                length: 8,
                charset: 'alphanumeric'
            });
        }
    },
    value: {
        type: Number, //phần trăm
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user_name: String
}, {
    timestamps: true
});

voucherSchema.pre('save', async function (next) {
    const user = await mongoose.model('User').findById(this.user_id);
    if (user) {
        this.user_name = user.name;
    }
    next();
});

module.exports = mongoose.model('Voucher', voucherSchema);