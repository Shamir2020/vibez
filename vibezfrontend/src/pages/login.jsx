import Footer from '../components/footer'
import { useState } from 'react'
import Navbar2 from '../components/navbar2'
import './css/login.css'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const submitForm = async (e)=>{

        e.preventDefault()

        if (!username || !password){
            toast.error('Fill all the fields properly')
        }
        else {
            const response = await fetch('/api/user/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            if (response.ok){
                const data = await response.json()
                toast.success('Login successful')
                localStorage.setItem('token',data.token)
                navigate('/')
                
            }
            else {
                toast.error('Login failed')
            }
        }
    }

    return (
        <>
            <Navbar2 />

            
            <div className="login-container">
                <h2>Login</h2>
                <form action="#" method="POST">
                    <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" required />
                    <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required />
                    <button onClick={submitForm}>Login</button>
                </form>
                <div className="signup-link">
                    <p>Don't have an account? <Link to='/register'>Sign Up</Link></p>
                </div>
            </div>

            <Footer />
        </>
    )
}


export default LoginPage