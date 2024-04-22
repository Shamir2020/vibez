import './css/navbar2.css'
import {Link} from 'react-router-dom'
import NavProfile from './navProfile'

const Navbar2 = ()=>{
    return (
    <div className="navbar2-container">
      <div className='navbar2-inside'>
      <div className='logo-container'>
          <h1>Vibez - Get your desired concert ticket</h1>
        </div>
        <ul className='navbar2-menu'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/concerts'>Concerts</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/contact'>Contact</Link></li>
          <NavProfile />
        </ul>
      </div>
    </div>

    )
}


export default Navbar2