import './css/navbar.css'
import { Link } from 'react-router-dom'
import NavProfile from './navProfile'

const Navbar = () => {

  // const scrollNavbar = ()=>{
  //   document.querySelector('.navbar-container').classList.toggle('sticky', window.scrollY > 0)
  // }
  // document.addEventListener('scroll' , scrollNavbar)

  
  


  return (
    <header>
      <nav>
        <div className="navbar-container">
          <div className="navbar-container-inside">
            <div className="logo">
              <h1>Vibez - Get your desired concert ticket</h1>
            </div>
            <ul className="menu">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/concerts'>Concerts</Link></li>
              <li><Link to='/about'>About</Link></li>
              <li><Link to='/contact'>Contact</Link></li>
              <NavProfile />
            </ul>
          </div>
        </div>
      </nav>
      <div className="hero">
        <h2>Discover Your Next Concert Experience</h2>
        <Link to="/" className="btn">Get Tickets</Link>
      </div>
    </header>
  )
}


export default Navbar