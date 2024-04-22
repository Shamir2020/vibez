
import { useEffect } from 'react'
import './css/profilePage.css'
import {Link,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Navbar2 from '../components/navbar2'
const ProfilePage = ()=>{

    const decode = jwtDecode(localStorage.getItem('token'))

    const id = decode.id

    const profileType = decode.role 
    
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const [profile, setProfile] = useState({})

    useEffect(()=>{
        const LoadProfile = async ()=>{
            const response = await fetch(`/api/profile/${id}`,{
                headers: {authorization: `Bearer ${token}`,
                        'Content-Type':'application/json'
                }
            })

            if (response.ok){
                const profile = await response.json()
                setProfile(profile)
                console.log(profile)
                
            }
        }
        LoadProfile()
    },[])

    if (token){
        return (
            <>
            <Navbar2 />
            <div className="profile-page">
                <div className="imageContainer">
                        <img src={`http://localhost:3000/${profile.profilePic}`} alt="error" />
                        
                    </div>
                <div className="profile-page-container">
                    
                    <div className="profile-page-container-col1 profile-page-container-cols">
                    <h3>Profile Information</h3>
                    <p>Name - <span className="red-text">{profile.name}</span></p>
                    <p>Language - <span className="red-text">{profile.language}</span></p>
                    <p>Location - <span className="red-text">{profile.location}</span></p>
                    <p>Phone - <span className="red-text">{profile.phone}</span></p>
                    <p>Profile Type - <span className="red-text">{profileType}</span></p>
                    </div>
                    <div className="profile-page-container-col2 profile-page-container-cols">
                    <h3>Socials links</h3>
                    <p>Facebook - <Link to={profile.facebook}><span className="red-text">Go to facebook</span></Link></p>
                    <p>Instagram - <Link to={profile.instagram}><span className="red-text">Go to instagram</span></Link></p>
                    <p>Linkedin - <Link to={profile.linkedin}><span className="red-text">Go to Linkedin</span></Link></p>
                    <p>Github - <Link to={profile.github}><span className="red-text">Go to github</span></Link></p>
                    </div>
                </div>
                <Link to='/update-profile'><button className='update-profile-btn1'>Update Profile</button></Link>
            </div>
            <Footer />
            </>
        )
    }
    else {
        navigate('/')
    }
}

export default ProfilePage