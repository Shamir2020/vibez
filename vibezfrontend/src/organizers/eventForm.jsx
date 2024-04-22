import './eventForm.css'

import { useEffect, useRef, useState } from "react"
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"
import {toast} from 'react-hot-toast'
import JoditEditor from 'jodit-react'
import { jwtDecode } from 'jwt-decode'
const EventForm = ()=>{

    const decoded = jwtDecode(localStorage.getItem('token'))
    const userId = decoded.id 

    const editor = useRef(null)

    const location = useLocation()

    const courseData = location.state

    const navigate = useNavigate()




    const [name, setName] = useState('')
    const [artistName, setArtistName] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [vipPrice, setVipPrice] = useState('')
    const [normalPrice, setNormalPrice] = useState('')
    const [vvipPrice, setVvipPrice] = useState('')
    const [venue, setVenue] = useState('')
    const [image, setImage] = useState('')

    const [venues, setVenues] = useState([])


    const FetchVenues = async ()=>{
        const response = await fetch('/api/venue')
        if (response.ok){
            const data = await response.json()

            setVenues(data)
        }
    }

    useEffect(()=>{
        FetchVenues()
    },[])

    const submitForm = async (e)=> {
        e.preventDefault()
        
        const formData = new FormData()

        
        formData.append('name',name)
        formData.append('artistName', artistName)
        formData.append("date", date)
        formData.append('time', time)
        formData.append('vipPrice', vipPrice)
        formData.append('normalPrice', normalPrice)
        formData.append('vvipPrice', vvipPrice)
        formData.append('venue', venue)
        formData.append('eventImage',image)

        if (courseData[0] == 'Create'){
            axios.post(`/api/event/${userId}`,formData, {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            })
            .then(res=>{
                if (res.status == 200){
                    navigate('/manage-events')
                    toast.success('Event added successfully')
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
        else if (courseData[0] == 'Update'){
            const id = courseData[1]._id

            axios.patch(`/api/event/${id}`,formData, {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            })
            .then(res=>{
                if (res.status == 200){
                    navigate('/manage-events')
                    toast.success('Event updated successfully')
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
        
        

    }




    useEffect(()=>{

        if (courseData[0] == 'Update'){
           
            setName(courseData[1].name)
            setArtistName(courseData[1].artistName)
            setDate(courseData[1].date)
            setTime(courseData[1].time)
            setVipPrice(courseData[1].vipPrice)
            setNormalPrice(courseData[1].normalPrice)
            setVvipPrice(courseData[1].vvipPrice)
            setVenue(courseData[1].venue)

            const elements = document.querySelector('.venuesField').children

            for (var i = 0; i<elements.length; i++){
                if (elements[i].value == courseData[1].venue._id){
                    elements[i].selected = true
                    
                    setVenue(courseData[1].venue)
                }

                // console.log(elements[i])
            }


            console.log(`Venue - ${courseData[1].venue.name}`)

        }
        
    },[])

    
    return (
        <div className="course-form-container">
            <h3>{courseData[0]} Event</h3>
            <form action="">
                
                <label htmlFor="name">Event name</label>
                <input type="text" name='name' value={name} onChange={(e)=>setName(e.target.value)} />

                <label htmlFor="artistName">Artist Name</label>
                <input value={artistName} onChange={(e)=>setArtistName(e.target.value)} type="text" name='artistName'  />

                <label htmlFor="date">Date</label>
                <input type="date"  name='date' value={date} onChange={(e)=>setDate(e.target.value)}/>

                <label htmlFor="time">Time</label>
                <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} name='time'/>

                <label htmlFor="vipPrice">VIP Ticket Price</label>
                <input type="number" value={vipPrice} onChange={(e)=>setVipPrice(e.target.value)} name='vipPrice' />

                <label htmlFor="normalPrice">Normal Ticket Price</label>
                <input type="number" value={normalPrice} onChange={(e)=>setNormalPrice(e.target.value)} name='normalPrice' />

                <label htmlFor="vvipPrice">VVIP Ticket Price</label>                
                <input type="number" value={vvipPrice} onChange={(e)=>setVvipPrice(e.target.value)} name='vvipPrice' />

                <label htmlFor="venue">Venue</label>
                <select className='venuesField' value={venue} onChange={(e)=>setVenue(e.target.value)} name="venue" id="">
                    <option value="">Select a venue</option>
                    {venues && venues.map((venue)=>{
                        return (
                            <option value={venue._id}>{venue.name}</option>
                        )
                    })}
                </select>

                <label htmlFor="courseImage">Image</label>
                <input type="file" name="courseImage" onChange={(e)=>setImage(e.target.files[0])}/>


                <button onClick={submitForm} className="create-btns">{courseData[0]} Event</button>

            </form>
        </div>
    )
}


export default EventForm