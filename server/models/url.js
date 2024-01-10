const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    requiredURL: {
        type: String,
        required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    expirationTimestamp: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

const URL = mongoose.model('url', urlSchema);

module.exports = URL;
