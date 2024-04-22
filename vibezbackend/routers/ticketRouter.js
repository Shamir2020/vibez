const express = require('express')

const ticketRouter = express.Router()

const {BookATicket} = require('../controllers/ticketController')

ticketRouter.post('/book', BookATicket)


module.exports = ticketRouter