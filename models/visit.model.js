const mongoose = require('mongoose');

const visitSchema = mongoose.Schema({
    visitor: {
        type: String,
        required: true,
    },
    visiting: {
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
    a_time: {
        type: Date,
        default: '00'
    },
    d_time: {
        type: Date,
        default: '00'
    },
    duration: {
        type: [],
        default: '00'
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