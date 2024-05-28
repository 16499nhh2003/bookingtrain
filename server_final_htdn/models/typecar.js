const mongoose = require('mongoose'); // Erase if already required

var typeCarSchema = new mongoose.Schema({
    type_name: {
        type: String, required: true,
        enum: ['Xe 24 chỗ', 'Xe 29 chỗ', 'Xe 35 chỗ', 'Xe 45 chỗ']
    },
    number_seat: { type: Number },
    description: { type: String },
    // isHide: { type: Boolean, default: false },
}, {
    timestamps: true
});


module.exports = mongoose.model('Type Car', typeCarSchema); 