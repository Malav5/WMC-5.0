const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    donationDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;