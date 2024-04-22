import { useEffect, useState } from "react"
import Footer from "../components/footer"
import Navbar2 from "../components/navbar2"

import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const VenueManagement = () => {

    const navigate = useNavigate()

    const [venues, setVenues] = useState([])

    const FetchVenues = async () => {
        const response = await fetch('/api/venue')

        if (response.ok) {
            const data = await response.json()

            setVenues(data)
        }
    }

    useEffect(() => {
        FetchVenues()
    }, [])

    const goToVenueForm = (array) => {
        navigate('/venue-form', { state: array })
    }

    const showVenue = (index)=>{
        const venueCard = document.querySelectorAll('.deletePromptContainer')[index]

        venueCard.style.display = 'flex'
    }
    const hideVenue = (index)=>{
        const venueCard = document.querySelectorAll('.deletePromptContainer')[index]

        venueCard.style.display = 'none'
    }

    const deleteVenueRequest = async (id)=>{
        const response = await fetch(`/api/venue/${id}`,{
            method: 'DELETE'
        })
        if(response.ok){
            toast.success('Venue has been deleted successfully')
            window.location.reload()
        }
        else {
            toast.error('Venue could not be deleted')
            window.location.reload()
        }
    }

    return (
        <>
            <Navbar2 />

            <h3>Manage Venues</h3>
            <div className="manage-events-page">

                {venues && venues.map((venue, index) => {
                    return (
                        <div className="event-card">

                            <div className="deletePromptContainer">
                                <h3>Are you sure to delete</h3>
                                <button onClick={()=>deleteVenueRequest(venue._id)} className="yes">Yes</button>
                                <button onClick={()=>hideVenue(index)} className="no">No</button>
                            </div>

                            <img src={`http://localhost:3000/${venue.venueImage}`} alt="error" />
                            <h3>{venue.name} </h3>
                            <p>Capacity - {venue.capacity}</p>
                            <p>Vip - {venue.vip}</p>
                            <p>Normal - {venue.normal}</p>
                            <p>VVIP - {venue.vvip}</p>

                            <div className="btns-container">
                                <button onClick={()=>goToVenueForm(['Update', venue])} className="manage-btns">Edit</button>
                                <button onClick={()=>showVenue(index)} className="manage-btns">Delete</button>
                            </div>
                        </div>
                    )
                })}

            </div>

            <div className="create-btns-container">
                <button onClick={() => goToVenueForm(['Create'])} className="create-btns">Create a Venue</button>
            </div>

            <Footer />
        </>
    )
}

export default VenueManagement