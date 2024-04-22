import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"
import {toast} from 'react-hot-toast'
import Navbar2 from "../components/navbar2"
import Footer from "../components/footer"

const ApproveEvents = () => {

    const navigate = useNavigate()

    const goToEventForm = (array) => {
        navigate('/event-form', { state: array })
    }

    const [events, setEvents] = useState([])
    const FetchEvents = async (req, res) => {
        const response = await fetch('/api/admin/events')

        if (response.ok) {
            const data = await response.json()
            setEvents(data)
        }
    }

    const showEvent = (index) => {
        const venueCard = document.querySelectorAll('.deletePromptContainer')[index]

        venueCard.style.display = 'flex'
    }
    const hideEvent = (index) => {
        const venueCard = document.querySelectorAll('.deletePromptContainer')[index]

        venueCard.style.display = 'none'
    }

    const deleteEventRequest = async (id)=>{
        const response = await fetch(`/api/event/${id}`,{
            method: 'DELETE'
        })
        if(response.ok){
            toast.success('Event has been deleted successfully')
            window.location.reload()
        }
        else {
            toast.error('Event could not be deleted')
            window.location.reload()
        }
    }
    const ApproveEventRequest = async (id)=>{
        const response = await fetch(`/api/admin/approve-event/${id}`)

        if (response.ok){
            toast.success('Event has been approved')
            window.location.reload()
        }
    }
    useEffect(() => {
        FetchEvents()
    }, [])
    return (
        <>
            <Navbar2 />

            <h3>Manage Events</h3>
            <div className="manage-events-page">

                {events && events.map((event, index) => {
                    return (
                        <div className="event-card">

                            <div className="deletePromptContainer">
                                <h3>Are you sure to delete</h3>
                                <button onClick={() => deleteEventRequest(event._id)} className="yes">Yes</button>
                                <button onClick={() => hideEvent(index)} className="no">No</button>
                            </div>

                            <img src={`http://localhost:3000/${event.eventImage}`} alt="error" />
                            <h3>Event name - {event.name} </h3>
                            <p>Date - {event.date}</p>
                            <p>Venue - {event.venue.name}</p>
                            <p>Time - {event.time}</p>
                            <div className="btns-container">
                                <button onClick={()=>ApproveEventRequest(event._id)} className="manage-btns">Approve</button>
                                <button onClick={()=>goToEventForm(['Update', event])} className="manage-btns">Edit</button>
                                <button onClick={()=>showEvent(index)} className="manage-btns">Delete</button>
                            </div>
                        </div>
                    )
                })}

            </div>



            <Footer />
        </>
    )
}

export default ApproveEvents