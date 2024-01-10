const mongoose = require('mongoose');

// Define the schema for the URL model
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

// Create the URL model using the schema
const URL = mongoose.model('url', urlSchema);

// Export the URL model
module.exports = URL;
