const express = require('express')

const venueRouter = express.Router()
const { CreateVenue, UpdateVenue, DeleteVenue, GetVenues, GetVenue } = require('../controllers/venueController')

venueRouter.post('/', CreateVenue)

venueRouter.patch('/:id', UpdateVenue)

venueRouter.delete('/:id', DeleteVenue)

venueRouter.get('/', GetVenues)

venueRouter.get('/:id', GetVenue)



module.exports = venueRouter