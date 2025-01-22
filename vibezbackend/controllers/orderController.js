const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const Event = require('../models/eventModel')
const Order = require('../models/orderModel')

const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = 'totoc673638de179f4'
const store_passwd = 'totoc673638de179f4@ssl'
const is_live = false //true for live, false for sandbox

const CheckoutOrder = async (req, res)=>{
    const token = req.body.token
    const userId = jwt.decode(token).id
    const ticketCount = req.body.ticketCount
    const ticketType = req.body.ticketType

    if (!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(404).json({error:'Invalid UserID'})
    }
    
    if(!mongoose.Types.ObjectId.isValid(req.body.eventId)){
        return res.status(404).json({error:'Invalid TicketID'})
    }

    // console.log(userId)
    // console.log(req.body.eventId)
    // console.log(req.body)

    var event = await Event.findById(req.body.eventId)

    var price = 0
    var unitPrice = 0

    if (ticketType == 'vip') {
        if (event.vipSeats < ticketCount){
            return res.status(404).json({error:'Not enough seats available.'})
        }
        price = event.vipPrice * ticketCount
        unitPrice = event.vipPrice
    }
    else if (ticketType == 'normal'){
        if (event.normalSeats < ticketCount){
            return res.status(404).json({error:'Not enough seats available.'})
        }
        price = event.normalPrice * ticketCount
        unitPrice = event.normalPrice
    }
    else if (ticketType == 'vvip'){
        if (event.vvipSeats < ticketCount){
            return res.status(404).json({error:'Not enough seats available.'})
        }
        price = event.vvipPrice * ticketCount
        unitPrice = event.vvipPrice
    }

    else {
        return res.status(404).json({error:'Invalid Ticket Type'})
    }

    var transactionID = generateTransactionID()
    transactionID = await generateUniqueTransactionId(transactionID)


    console.log(transactionID)

    

    const data = {
        total_amount: price,
        currency: 'BDT',
        tran_id: transactionID, // use unique tran_id for each api call
        success_url: 'http://localhost:3000/success/'+transactionID,
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: event.id,
        cus_name: req.body.name,
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: req.body.phone,
        cus_fax: '01711111111',
        ship_name: req.body.name,
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

    const order = await Order.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        ticketType: req.body.ticketType,
        ticketCount: req.body.ticketCount,
        event: event.id,
        user: userId,
        ticketPrice: unitPrice,
        transactionID: transactionID.toString(),
        paid: false
    })

    console.log(data)


    // res.status(200).json(data)
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        // res.redirect(GatewayPageURL)
        res.status(200).json({url:GatewayPageURL})
        console.log('Redirecting to: ', GatewayPageURL)
    });

    
}



function generateTransactionID(prefix = "TXN") {
    const timestamp = Date.now().toString(36); // Base36 encoding of current timestamp
    const randomPart = Math.random().toString(36).substring(2, 10); // Random string
    const uniquePart = (Math.random() * 100000000).toFixed(0); // Optional unique identifier

    return `${prefix}-${timestamp}-${randomPart}-${uniquePart}`;
}



async function generateUniqueTransactionId(transactionID){
    if (await Order.findOne({transactionID: transactionID})) {
        return generateUniqueTransactionId(generateTransactionID())
    }
    return transactionID
}


module.exports = {
    CheckoutOrder
}