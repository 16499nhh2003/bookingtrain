const mongoose = require('mongoose'); // Erase if already required

var carSchema = new mongoose.Schema({
    license_plates: { type: String, required: true, unique: true },
    typecar_id: { type: mongoose.Types.ObjectId, ref: 'Type Car', required: true },
    company_id: { type: mongoose.Types.ObjectId, ref: 'Company', required: true },
    availibility: { type: Boolean },
    isHide: { type: Boolean },
    images: [{ type: String }],
    seats: [{ type: mongoose.Types.ObjectId, ref: 'Seat', }],
    driverTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DriverTrip' }],
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
}, {
    timestamps: true
});

carSchema.pre('save', async function (next) {
    const typecar = await mongoose.model('Type Car').findById(this.typecar_id);
    if (typecar) {
        this.type_name = typecar.type_name;
    }
    next();
});


module.exports = mongoose.model('Car', carSchema);