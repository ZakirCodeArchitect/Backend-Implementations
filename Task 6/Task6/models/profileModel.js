const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    city: {
        type: String,
        ref: 'City',
        required: true
    },
    date_of_birth: {
        type: Date,
    },
    occupation: {
        type: String,
    },
    bio: {
        type: String
    }
}, { timestamps: true });

const Profile = mongoose.model('profile', profileSchema)

module.exports = Profile;