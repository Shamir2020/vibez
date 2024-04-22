import { Link, useNavigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'

import toast from 'react-hot-toast'

const NavProfile = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    var username 
    var role

    try {
        const decoded = jwtDecode(token)
        username = decoded.username
    }
    catch(error){
        console.log(error)
    }

    const logout = ()=>{
        localStorage.removeItem('token')
        toast.success('Logout successful')
        navigate('/')
    }



    if (token == '' || token == undefined || token == null) {
        return (
            <li><Link to='/login'>Login / Register</Link></li>
        )
    }
    else {
        return (
            <>
                <li className='li-profile'><Link className='profile' to='/'>{username}</Link>
                    <ul className='dropdown-menu'>
                        <li><Link to='/profile'>Profile</Link></li>
                        <li><Link to='/dashboard'>Dashboard</Link></li>

                    </ul>
                </li>
                <li onClick={logout}><Link to='/'>Logout</Link></li>
            </>
        )
    }
}

export default NavProfile