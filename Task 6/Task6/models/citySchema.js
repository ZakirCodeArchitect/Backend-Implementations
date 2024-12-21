const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {timestamps: true });

const City = mongoose.model('City', citySchema)

module.exports = {City};