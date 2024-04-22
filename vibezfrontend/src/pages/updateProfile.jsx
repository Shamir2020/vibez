import { useState, useEffect } from 'react'
import './css/profilePage.css'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const UpdateProfile = ()=>{

    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const sid = decoded.id

    const [name, setName] = useState('')
    const [language, setLanguage] = useState('')
    const [location, setLocation] = useState('')
    const [facebook, setFacebook] = useState('')
    const [instagram, setInstagram] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState('')
    const [id, setId] = useState('')


    useEffect(()=>{
        const LoadProfile = async ()=>{

            const response = await fetch(`/api/profile/${sid}`,{
                headers: {authorization: `Bearer ${token}`}
            })

            if (response.ok){
                const profile = await response.json()
                setName(profile.name)

                if(profile.location !==undefined) setLocation(profile.location)
                if(profile.language !==undefined) setLanguage(profile.language)
                
                if(profile.facebook !==undefined) setFacebook(profile.facebook)
                if(profile.instagram !==undefined) setInstagram(profile.instagram)
                if(profile.linkedin !==undefined) setLinkedin(profile.linkedin)
                if (profile.phone !== undefined) setPhone(profile.phone)


            }
        }
        LoadProfile()
    },[])

    const SubmitForm = async (e)=>{
        e.preventDefault()

        const formData = new FormData()

        formData.append('id', sid)
        formData.append('name',name)
        formData.append('language', language)
        formData.append('location', location)
        formData.append('facebook',facebook)
        formData.append('instagram',instagram)
        formData.append('linkedin',linkedin)
        formData.append('phone', phone)
        formData.append('profilePic', image)

        console.log(`image: ${image}`)

        await axios.post('/api/profile', formData, {
            headers:{'Authorization':`Bearer ${token}`}
        })
        .then(res=>{
            if (res.status == 200){
                toast.success('profile updated successfully!')
                navigate('/profile')
            }
            else {
                toast.error('Profile could not be updated')
            }
        })
        .catch(error=>{
            toast.error('Something went wrong')
        })
        

    }

    if(token){
        return (
            <div className="profile-page">
                <form action="" className="profile-page-container" enctype="multipart/form-data">
                    <div className="profile-page-container-col1 profile-page-container-cols">
                    <h3>Profile Information</h3>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="John Doe" />

    
                    <label htmlFor="Language">Language</label>
                    <select name="language" value={language} onChange={(e)=>setLanguage(e.target.value)} id="">
                        <option value="">Select Language</option>
                        <option value="Bengali">Bengali</option>
                        <option value="English">English</option>
                        <option value="French">French</option>
                    </select>
    
                    <label htmlFor="location">Location</label>
                    <select name="location" value={location} onChange={(e)=>setLocation(e.target.value)} id="">
                        <option value="">Select Location</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Costa Rica">Costa Rica</option>
                    </select>

                    <label htmlFor="facebook">Phone</label>
                    <input type="text" name="facebook" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="phone" />
                    

                    </div>
                    <div className="profile-page-container-col2 profile-page-container-cols">
                    <h3>Socials links</h3>
                    <label htmlFor="facebook">Facebook Link</label>
                    <input type="text" name="facebook" value={facebook} onChange={(e)=>setFacebook(e.target.value)} placeholder="fb-link" />
    
                    <label htmlFor="instagram">Instagram Link</label>
                    <input type="text" name="instagram" value={instagram} onChange={(e)=>setInstagram(e.target.value)} placeholder="fb-link" />
    
                    <label htmlFor="linkedin">Linkedin Link</label>
                    <input type="text" name="linkedin" value={linkedin} onChange={(e)=>setLinkedin(e.target.value)} placeholder="fb-link" />
    
                    
                    <label htmlFor="profilePic">Profile Picture</label>
                    <input type="file" name="profilePic"  onChange={(e)=>setImage(e.target.files[0])}/>
                    
                    <button onClick={SubmitForm} className='update-profile-btn'>Save Profile</button>    
                    </div>

                
                </form>
                
            </div>
        )
    }
    else {
        navigate('/')
    }
}

export default UpdateProfile