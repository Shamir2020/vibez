const { default: mongoose } = require('mongoose')
const Venue = require('../models/venueModel')



const CreateVenue = async (req, res)=>{

    try {
        const venue = await Venue.create({
            name: req.body.name,
            capacity: req.body.capacity, 
            vip: req.body.vip,
            normal: req.body.normal,
            vvip: req.body.vvip,
            venueImage: req.file.path 
        })

        res.status(200).json(venue)
    }
    catch(error){
        res.status(500).json({error:'Something went wrong'})
    }
}

const UpdateVenue = async (req, res)=>{
    const id = req.params.id 
    try {
        var venue 
        
        if (req.file){
            venue = await Venue.findByIdAndUpdate({_id:id},{
                name: req.body.name,
                capacity: req.body.capacity, 
                vip: req.body.vip,
                normal: req.body.normal,
                vvip: req.body.vvip,
                venueImage: req.file.path 
            })
        }
        else {
            venue = await Venue.findByIdAndUpdate({_id:id},{
                name: req.body.name,
                capacity: req.body.capacity, 
                vip: req.body.vip,
                normal: req.body.normal,
                vvip: req.body.vvip,
            })
        }

        res.status(200).json(venue)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }

}

const DeleteVenue = async (req, res)=>{
    
    try {
        const id = req.params.id 

    const venue = await Venue.findByIdAndDelete(id)

    res.status(200).json({venue})
    }
    catch(error){
        res.status(500).json({error: error.message})
    }

}

const GetVenues = async (req, res)=>{
    const venues = await Venue.find({})

    res.status(200).json(venues)
}

const GetVenue = async (req, res)=>{
    const id = req.params.id 

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'Invalid id'})
    }
    const venue = await Venue.findById(id)

    if (!venue){
        return res.status(400).json({error:'Venue not found'})
    }
    res.status(200).json(venue)
}

const GetVenueForTicketPurchase = async (req, res)=>{
    const id = req.params.id 

    const venue = await Venue.find({})
}

module.exports = {
    CreateVenue,
    UpdateVenue,
    DeleteVenue,
    GetVenues,
    GetVenue
}