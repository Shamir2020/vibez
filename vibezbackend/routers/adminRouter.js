
const express = require('express')
const { adminRegister, GetEventsAdmin, ApproveEvent } = require('../controllers/adminController')

const adminRouter = express.Router()


adminRouter.post('/register/:id', adminRegister)

adminRouter.get('/events', GetEventsAdmin)

adminRouter.get('/approve-event/:id', ApproveEvent)

module.exports = adminRouter