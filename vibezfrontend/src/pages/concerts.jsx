import Footer from "../components/footer"
import Navbar from "../components/navbar"
import { useEffect, useState } from "react"

const ConcertPage = () => {
    const [events, setEvents] = useState([])
    const FetchEvents = async (req, res) => {
        const response = await fetch('/api/event')

        if (response.ok) {
            const data = await response.json()
            setEvents(data)
            console.log(data)
        }
    }

    useEffect(() => {
        FetchEvents()
    }, [])

    return (
        <>
            <Navbar />
            <section className="concerts-section">
                <div className="container">

                    {events && events.map((event) => {
                        return (
                            <div className="concert-card">
                                <img src={`http://localhost:3000/${event.eventImage}`} alt="Concert Image" />
                                <div className="concert-details">
                                    <h3>{event.name}</h3>
                                    {/* <p>Artist - {event.artistName}</p> */}
                                    <p>Date: {event.date} at {event.time}</p>
                                    <p>Venue: {event.venue.name}</p>
                                    <a href="#" className="btn">Buy Tickets</a>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </section>

            <Footer />
        </>
    )
}

export default ConcertPage