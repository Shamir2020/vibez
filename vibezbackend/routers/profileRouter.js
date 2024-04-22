const express = require('express')
const { UpdateProfile, GetProfile } = require('../controllers/profileController')

const profileRouter = express.Router()


profileRouter.post('/', UpdateProfile)

profileRouter.get('/:id', GetProfile)




module.exports = profileRouter