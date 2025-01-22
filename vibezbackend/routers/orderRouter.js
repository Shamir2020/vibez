const express = require('express')
const { CheckoutOrder } = require('../controllers/orderController')

const orderRouter = express.Router()



orderRouter.post('/', CheckoutOrder)



module.exports = orderRouter