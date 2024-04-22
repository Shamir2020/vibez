import { useState } from 'react'
import Footer from '../components/footer'
import Navbar2 from '../components/navbar2'
import './css/login.css'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'

const RegisterPage = () => {

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [role, setRole] = useState('')


    const submitForm = async (e)=>{

        e.preventDefault()

        if (!name || !email || !password1 || !password2 || !role){
            toast.error('Fill all the fields properly')
        }
        else if (password1 != password2){
            toast.error('Passwords do not match')
        }

        else {
            const response = await fetch('/api/user/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    username: username,
                    password1: password1,
                    password2: password2,
                    role: role
                })
            })
            if (response.ok){
                toast.success('User registration successful')
                navigate('/login')
                
            }
            else {
                const data = await response.json()
                toast.error(data.error)
            }
        }
    }


    return (
        <>
            <Navbar2 />
            <div className="login-container">
                <h2>Register</h2>
                <form action="#" method="POST">
                    <input type="text" name="fullname" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full Name" autoComplete='off' required />
                    <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" required />
                    <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required />
                    <input type="password" name="password" value={password1} onChange={(e)=>setPassword1(e.target.value)} placeholder="Password" required />
                    <input type="password" name="confirm-password" value={password2} onChange={(e)=>setPassword2(e.target.value)} placeholder="Confirm Password" required />

                    
                    <select name="role" id="" value={role} onChange={(e)=>setRole(e.target.value)}>
                        <option value="">Select role</option>
                        <option value="customer">Customer</option>
                        <option value="organizer">Organizer</option>
                    </select>
                    
                    <button onClick={submitForm}>Register</button>
                </form>
                <div className="login-link">
                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default RegisterPage