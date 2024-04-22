const User = require('../models/userModel')
const Event = require('../models/eventModel')
const mongoose = require('mongoose')

const BookATicket = async (req, res)=>{


    console.log('Inside Book ticket controller')

    const id = req.body.eventId 
    const ticketType = req.body.ticketType 
    const userId = req.body.userId


    console.log(id)
   
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({error:'Invalid ID'})
    }

    const event = await Event.findById(id)  

    console.log(event)

    if (ticketType == 'normal'){
        if (event.normalSeats == 0){
            return res.status(400).json({error:'No Normal seats left'})
        }
        event.normalCustomer.push(userId)
        event.normalSeats -= 1

    }

    else if (ticketType == 'vip'){
        if (event.vipSeats == 0){
            return res.status(400).json({error:'No Normal seats left'})
        }
        event.vipCustomer.push(userId)
        event.vipSeats -= 1
        
    }
    else if (ticketType == 'vvip'){
        if (event.vvipSeats == 0){
            return res.status(400).json({error:'No Normal seats left'})
        }
        event.vvipCustomer.push(userId)
        event.vvipSeats -= 1
        
    }
    await event.save()

    res.status(200).json(event)


}


module.exports = {
    BookATicket
}