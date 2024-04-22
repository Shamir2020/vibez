const express = require('express')
const mongoose = require('mongoose')
const app = express()
const mongoose_uri = `mongodb+srv://labibfarhan24:xJXvbZR7wH8xIRst@cluster0.byudct4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

const userRouter = require('./routers/userRouter')
const profileRouter = require('./routers/profileRouter')
const adminRouter = require('./routers/adminRouter')
const venueRouter = require('./routers/venueRouter')
const eventRouter = require('./routers/eventRouter')
const ticketRouter = require('./routers/ticketRouter')

mongoose.connect(mongoose_uri)
.then( (msg)=>{
    console.log('Connected to DB')
    app.listen(4000, async (req, res)=>{
        console.log(`Server started at 4000`)
    })
    
})
.catch((error)=>{
    throw new error
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



// Define static folder for image
app.use('/uploads', express.static('uploads'))
