import { useEffect, useState } from "react"
import Footer from "../components/footer"
import Navbar2 from "../components/navbar2"
import rock from '../images/rock.jpg'
import './manageEvent.css'
import { useNavigate } from "react-router-dom"
import {toast} from 'react-hot-toast'
import { jwtDecode } from "jwt-decode"

const ManageEvents = () => {

    const navigate = useNavigate()

    const decode = jwtDecode(localStorage.getItem('token'))

    const userId = decode.id 

    const goToEventForm = (array) => {
        navigate('/event-form', { state: array })
    }

    const [events, setEvents] = useState([])
    const FetchEvents = async (req, res) => {
        const response = await fetch(`/api/event/organizer/${userId}`)

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
                                <button className="manage-btns">View</button>
                                <button onClick={()=>goToEventForm(['Update', event])} className="manage-btns">Edit</button>
                                <button onClick={()=>showEvent(index)} className="manage-btns">Delete</button>
                            </div>
                        </div>
                    )
                })}

            </div>

            <div className="create-btns-container">
                <button onClick={() => goToEventForm(['Create'])} className="create-btns">Create an Event</button>
            </div>

            <Footer />
        </>
    )
}

export default ManageEvents