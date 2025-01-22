require('dotenv').config()
const express = require('express')

const mongoose = require('mongoose')
const app = express()
const mongoose_uri = process.env.MONGO_URL

const multer = require('multer')
const upload = multer({dest: 'uploads/'})

const userRouter = require('./routers/userRouter')
const profileRouter = require('./routers/profileRouter')
const adminRouter = require('./routers/adminRouter')
const venueRouter = require('./routers/venueRouter')
const eventRouter = require('./routers/eventRouter')
const ticketRouter = require('./routers/ticketRouter')
const orderRouter = require('./routers/orderRouter')
// SSL COMMERZ IMPORT
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = 'totoc673638de179f4'
const store_passwd = 'totoc673638de179f4@ssl'
const is_live = false //true for live, false for sandbox
const Order = require('./models/orderModel')
const Event = require('./models/eventModel')

// SSL COMMERZ IMPORT

app.get('/init', (req, res) => {
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: 'http://localhost:3030/success',
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.redirect(GatewayPageURL)
        console.log('Redirecting to: ', GatewayPageURL)
    });
})


mongoose.connect(mongoose_uri)
.then( (msg)=>{
    console.log('Connected to DB')
    app.listen(4000, async (req, res)=>{
        console.log(`Server started at 4000`)
    })
    
})
.catch((error)=>{
    console.log(error)
    // throw new error
})

app.get('/', async (req, res)=>{
    res.status(200).json({msg:'Welcome to Vibez backend'})
})

app.use(express.json())


// Routers 

app.use('/api/user', userRouter)

app.use('/api/profile',upload.single('profilePic'), profileRouter)

app.use('/api/venue',upload.single('venueImage'), venueRouter)

app.use('/api/event',upload.single('eventImage'), eventRouter)

app.use('/api/ticket', ticketRouter)

app.use('/api/admin', adminRouter)

app.use('/api/order', orderRouter)

// Define static folder for image
app.use('/uploads', express.static('uploads'))


app.post('/success/:tranId', async (req, res)=>{

    console.log(req.params.tranId)
    const url = `/success/${req.params.tranId}`
    const order = await Order.findOne({transactionID: req.params.tranId.toString()})

    const eventId = order.event 

    const ticketType = order.ticketType
    const ticketCount = order.ticketCount

    const event = await Event.findById(eventId)

    if (ticketType == 'vip') {
        event.vipSeats = event.vipSeats - ticketCount
    }
    else if (ticketType == 'normal'){
        event.normalSeats = event.normalSeats - ticketCount
    }
    else if (ticketType == 'vvip'){
        event.vvipSeats = event.vvipSeats - ticketCount
    }
    await event.save()
    
    console.log(order)

    order.paid = true 
    await order.save()


    res.redirect(url)
})