const mongoose = require('mongoose');

const visitSchema = mongoose.Schema({
    visitor: {
        type: String,
        required: true,
    },
    visited: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    relationship: {
        type: String
    },
    startTime: {
        type: Date,
        default: Date.now()
    },
    stopTime: {
        type: Date,
        default: Date.now()
    },
    visitStarted: {
        type: Boolean,
        default: false,
    },
    stopped: {
        type: Boolean,
        default: false,
    },
    duration: {
        type: [],
        default: []
    },
    organization: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date().toISOString()
    }
})

module.exports = mongoose.model('visitsDB', visitSchema);