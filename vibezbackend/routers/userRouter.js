const express = require('express')

const userRouter = express.Router()

const {Login, Register} = require('../controllers/userController')

userRouter.post('/login', Login)

userRouter.post('/register', Register)




module.exports = userRouter