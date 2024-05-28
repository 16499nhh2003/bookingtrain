const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, },
    firstname: { type: String, required: true, },
    lastname: { type: String, required: true, },
    mobile: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
    confirmationCode: String,
    role: { type: String, enum: ['user', 'owner', 'admin', 'staff', 'driver'], default: 'user', },
    points: { type: Number, },
    isBlocked: { type: Boolean, default: false },
    refreshToken: { type: String, },
    // passwordChangedAt: { type: String, },
    // passwordResetToken: { type: String, },
    // passwordResetExpires: { type: String, },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    userDriverTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserDriverTrip' }],

    // bằng lái xe khi người dùng có role là driver
    licenseNumber: { type: String },
    // nhân viên còn làm hay nghỉ
    status: { type: Boolean },
    points: { type: Number }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
})


userSchema.methods = {
    isCorrectPassword: async function (password) {
        console.log(password)
        return await bcrypt.compare(password, this.password)
    },
    createPasswordChangedToken: function () {
        const resetToken = crypto.randomBytes(32).toString('hex')
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpires = Date.now() + 15 * 60 * 1000
        return resetToken
    }
}

//Export the model
module.exports = mongoose.model('User', userSchema);