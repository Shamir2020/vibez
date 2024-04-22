import { Link } from "react-router-dom"


const AdminDashboard = ()=>{
    
    return (
        <>
        <div className="dashboardInside">
            <h3>Admin's dashboard</h3>
            <div className="links-container">
            <Link to='/manage-venues'>Go to Venue management page</Link>
            <Link to='/approve-events'>Go to Event approval page</Link>
            </div>
        </div>
        </>
    )
}

export default AdminDashboard