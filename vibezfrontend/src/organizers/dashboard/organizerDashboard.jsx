import { Link } from 'react-router-dom'
import './organizerDashboard.css'

const OrganizerDashboard = () => {
    return (

        <div className="dashboardInside">
            <h3>Organizer's dashboard</h3>
            <div className="links-container">
            <Link to='/manage-events'>Go to Event management page</Link>
            </div>
        </div>
    )
}

export default OrganizerDashboard