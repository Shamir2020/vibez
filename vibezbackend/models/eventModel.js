const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: {
        type: String
    },
    artistName: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    vipPrice: {
        type: Number
    },
    vipSeats: {
        type: Number
    },
    normalPrice: {
        type: Number
    },
    normalSeats: {
        type: Number
    },
    vvipPrice:{
        type: Number
    },
    vvipSeats: {
        type: Number
    },
    eventImage: {
        type: String
    },
    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue'
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    normalCustomer: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    vipCustomer: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    vvipCustomer: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    approved:{
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('Event', eventSchema)