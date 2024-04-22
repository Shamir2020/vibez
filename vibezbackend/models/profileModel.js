const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    profilePic:{
        type: String
    },

    language: {
        type: String
    },
    location:{
        type: String
    },
    facebook:{
        type: String
    },
    instagram:{
        type: String
    },
    linkedin:{
        type: String
    },

    phone: {
        type: String
    },

})

module.exports = mongoose.model('Profile', profileSchema)