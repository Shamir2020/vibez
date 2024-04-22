import './css/featuredConcerts.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const FeaturedConcerts = () => {
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

    <section className="featured-concerts">
      <div className="featured-container">
        <h3>Featured Concerts</h3>
        <div className="concert-cards">

          {events && events.map((event) => {
            return (
              <div className="concert-card">
                <Link to={`/buy-ticket/${event._id}`}><img src={`http://localhost:3000/${event.eventImage}`} alt="Concert Image" /></Link>
                <h4>{event.name}</h4>
                <p>Date: {event.date} at {event.time}</p>
                <p>Venue: {event.venue.name}</p>
                <Link to={`/buy-ticket/${event._id}`} className="btn">Buy Tickets</Link>
              </div>
            )
          })}

        </div>
      </div>
    </section>
  )
}


export default FeaturedConcerts