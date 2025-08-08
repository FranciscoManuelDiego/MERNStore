const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default: "", required: false },
    phone: { type: String, default: "", required: false },
}, {
    timestamps: true,
    // This ensures defaults are applied
    minimize: false
});

module.exports = mongoose.model('User', UserSchema);