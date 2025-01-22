const express = require('express')
const { CreateEvent, GetEvents, UpdateEvent, DeleteEvent, GetOrganizerEvent, GetAnEvent } = require('../controllers/eventController')

const eventRouter = express.Router()



// http://localhost:4000/api/event/:userId
eventRouter.post('/:userId', CreateEvent)

eventRouter.get('/organizer/:userId',GetOrganizerEvent)

eventRouter.get('/', GetEvents)

eventRouter.get('/single/:id', GetAnEvent)

eventRouter.patch('/:id', UpdateEvent)

eventRouter.delete('/:id', DeleteEvent)



module.exports = eventRouter