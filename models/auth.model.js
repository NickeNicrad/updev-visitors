const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date().toISOString()
    }
})

module.exports = mongoose.model('authDB', authSchema);