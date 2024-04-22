const User = require('../models/userModel')
const mongoose = require('mongoose')
const Event = require('../models/eventModel')

const adminRegister = async (req, res)=>{
    const id = req.params.id 

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'Invalid ID'})
    }
    const user = await User.findByIdAndUpdate({_id: id},{
        role: 'admin'
    })


    res.status(200).json({msg:'Admin registered successfully'})
}


const ApproveEvent = async (req, res)=>{
    const id = req.params.id 

    const event = await Event.findByIdAndUpdate({_id:id},{
        approved: true
    })

    res.status(200).json(event)
}


const GetEventsAdmin = async (req, res)=>{
    const events = await Event.find({approved:false}).populate('venue')

    res.status(200).json(events)
}


module.exports = {
    adminRegister,
    GetEventsAdmin,
    ApproveEvent
}