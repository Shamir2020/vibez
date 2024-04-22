import { jwtDecode } from "jwt-decode"
import OrganizerDashboard from "../organizers/dashboard/organizerDashboard"
import CustomerDashboard from "../customer/dashboard/customerDashboard"
import Navbar2 from '../components/navbar2'
import Footer from '../components/footer'
import AdminDashboard from "../admin/adminDashboard"

const Dashboard = () => {

    const decode = jwtDecode(localStorage.getItem('token'))

    const role = decode.role

    if (role == 'organizer') {
        return (
            <>
                <Navbar2 />
                <OrganizerDashboard />
                <Footer />
            </>
        )

    }
    else if (role == 'customer') {
        return (
            <>
                <Navbar2 />
                <CustomerDashboard />
                <Footer />
            </>
        )
    }
    else if (role == 'admin') {
        return (
            <>
                <Navbar2 />
                <AdminDashboard />
                <Footer />
            </>
        )
    }

}


export default Dashboard