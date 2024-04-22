import './css/footer.css'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer>
            <div class="container">
                <div><p>&copy; 2024 Concert Tickets. All Rights Reserved.</p></div>
                <ul class="footer-menu">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/concerts'>Concerts</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/contact'>Contact</Link></li>
                </ul>
            </div>
        </footer>
    )
}


export default Footer