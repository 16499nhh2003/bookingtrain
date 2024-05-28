const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    code: {
        type: String,
        maxLength: 20
    },
    description: {
        type: String,
    },
    discountAmount: {
        type: Number,
    },
    trips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip'
    }],
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    }
});

module.exports = mongoose.model('Promotion', promotionSchema);
