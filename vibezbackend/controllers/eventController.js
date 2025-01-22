const { default: mongoose } = require('mongoose')
const Event = require('../models/eventModel')
const Venue = require('../models/venueModel')
const express = require('express')


const CreateEvent = async (req, res) => {

    const id = req.params.userId

    try {

        const venue = await Venue.findById(req.body.venue)

        const event = await Event.create({
            name: req.body.name,
            date: req.body.date,
            time: req.body.time,
            vipPrice: req.body.vipPrice,
            normalPrice: req.body.normalPrice,
            vvipPrice: req.body.vvipPrice,
            eventImage: req.file.path,
            venue: req.body.venue,
            artistName: req.body.artistName,
            organizer: id,
            normalSeats: venue.normal,
            vipSeats: venue.vip,
            vvipSeats: venue.vvip,
            description: req.body.description

        })



        venue.events.push(event.id)

        await venue.save()

        res.status(200).json({ msg: 'event created successfully' })
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}

const UpdateEvent = async (req, res) => {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID' })
    }

    try {
        var event

        if (req.file) {
            event = await Event.findByIdAndUpdate({ _id: id }, {
                name: req.body.name,
                date: req.body.date,
                time: req.body.time,
                vipPrice: req.body.vipPrice,
                normalPrice: req.body.normalPrice,
                vvipPrice: req.body.vvipPrice,
                eventImage: req.file.path,
                artistName: req.body.artistName,
                description: req.body.description
            
            })
        }
        else {
            event = await Event.findByIdAndUpdate({ _id: id }, {
                name: req.body.name,
                date: req.body.date,
                time: req.body.time,
                vipPrice: req.body.vipPrice,
                normalPrice: req.body.normalPrice,
                vvipPrice: req.body.vvipPrice,
                artistName: req.body.artistName,
                description: req.body.description

            })
        }

        res.status(200).json(event)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error)
        console.log(error.message)
    }

}

const DeleteEvent = async (req, res) => {

    try {
        const id = req.params.id

        const event = await Event.findByIdAndDelete(id)

        res.status(200).json({ event })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const GetEvents = async (req, res) => {
    const events = await Event.find({ approved: true }).populate('venue')

    res.status(200).json(events)
}

const GetOrganizerEvent = async (req, res) => {
    const events = await Event.find({ organizer: req.params.userId })

    res.status(200).json(events)
}

const GetAnEvent = async (req, res) => {
    const id = req.params.id

    try {
        const event = await Event.findById(id).populate('venue')

        res.status(200).json(event)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}



module.exports = {
    CreateEvent,
    UpdateEvent,
    DeleteEvent,
    GetEvents,
    GetOrganizerEvent,
    GetAnEvent,
}