const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    ticketType: {
        type: String,
        enum: ['vip', 'normal', 'vvip'],
        required: true,
        default: 'normal'
    },
    ticketPrice: {
        type: Number,
        default: 0
    },
    ticketCount: {
        type: Number,
        required: true,
        default: 1
    },
    transactionID: {
        type: String
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    paid: {
        type: Boolean,
        default: false
    },
}, {timestamps: true})


orderSchema.virtual('totalPrice').get(function(){
    return this.ticketCount * this.ticketPrice
})

orderSchema.set('toJSON', {virtuals: true})
orderSchema.set('toObject', {virtuals: true})

module.exports = mongoose.model('Order', orderSchema)