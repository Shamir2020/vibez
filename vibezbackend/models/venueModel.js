const mongoose = require('mongoose')


const venueSchema = new mongoose.Schema({
    name: {
        type: String 
    },
    capacity: {
        type: Number
    },
    vip: {
        type: Number 
    },
    normal: {
        type: Number
    },
    vvip: {
        type: Number
    },
    venueImage: {
        type: String
    }
    ,
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
})

module.exports = mongoose.model('Venue', venueSchema)