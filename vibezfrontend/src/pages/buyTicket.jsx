import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import Navbar2 from "../components/navbar2"
import Footer from "../components/footer"
import toast from "react-hot-toast"
import { jwtDecode } from "jwt-decode"


const BuyTicket = ()=>{

    const [event, setEvent] = useState(null)
    const params = useParams()
    const id = params.id 
    const navigate = useNavigate()

    const decoded = jwtDecode(localStorage.getItem('token'))
    const userId = decoded.id

    const FetchConcert = async ()=>{
        const response = await fetch(`/api/event/single/${id}`)
        if (response.ok){
            const data = await response.json()
            setEvent(data)
            console.log(data)
        }
    }

    const moveToTicketCheckout = (id)=>{
        navigate(`/checkout/${id}`)
    }


    useEffect(()=>{
        FetchConcert()
    },[])

    return (
        <div className="buy-ticket-container">
            <Navbar2 />
            <h3>Buy your desired concert ticket</h3>

            <div className="concert-card">
                <img src={`http://localhost:3000/${event?.eventImage}`} alt="Concert Image" />
                <h2>{event?.name}</h2>
                <h3>Artist - {event?.artistName}</h3>
                <p>Date: {event?.date} at {event?.time}</p>
                <p>Venue: {event?.venue.name}</p>
                <p>{event?._id}</p>

                <h3>Ticket Price - </h3>
                <p>Normal Ticket Price - {event?.normalPrice}</p>
                <p>VIP Ticket Price - {event?.vipPrice}</p>
                <p>VVIP Ticket Price - {event?.vvipPrice}</p>

                <h3>Seats left - </h3>

                <p>Normal Tickets left - {event?.normalSeats}</p>
                <p>VIP Tickets left - {event?.vipSeats} </p>
                <p>VVIP Tickets left - {event?.vvipSeats}</p>

                <button onClick={()=>moveToTicketCheckout(event?._id)} className="book-ticket">Book Ticket now</button>


        

              </div>

            <div className="main-ticket-container">

            </div>

            <Footer />
        </div>
    )
}


export default BuyTicket