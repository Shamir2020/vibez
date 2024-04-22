
import { useEffect, useRef, useState } from "react"
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"
import {toast} from 'react-hot-toast'
import JoditEditor from 'jodit-react'

const VenueForm = ()=>{


    const editor = useRef(null)

    const location = useLocation()

    

    const courseData = location.state

    const navigate = useNavigate()


    const [name, setName] = useState('')
    const [capacity, setCapacity] = useState('')
    const [vip, setVip] = useState('')
    const [normal, setNormal] = useState('')
    const [vvip, setvvip] = useState('')
    const [image, setImage] = useState('')



    const submitForm = async (e)=> {
        e.preventDefault()
        
        const formData = new FormData()

        formData.append('name',name)
        formData.append('capacity', parseInt(capacity))
        formData.append('vip', parseInt(vip))
        formData.append('normal', parseInt(normal))
        formData.append('vvip', parseInt(vvip))
        formData.append('venueImage',image)

        if (courseData[0] == 'Create'){
            axios.post('/api/venue',formData, {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            })
            .then(res=>{
                if (res.status == 200){
                    navigate('/manage-venues')
                    toast.success('Venue added successfully')
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
        else if (courseData[0] == 'Update'){
            const id = courseData[1]._id



            axios.patch(`/api/venue/${id}`,formData, {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            })
            .then(res=>{
                if (res.status == 200){
                    navigate('/manage-venues')
                    toast.success('Venue updated successfully')
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
        
        

    }




    useEffect(()=>{

        if (courseData[0] == 'Update'){
           setName(courseData[1].name)
           setCapacity(courseData[1].capacity)
           setVip(courseData[1].vip)
           setNormal(courseData[1].normal)
           setvvip(courseData[1].vvip)
     
        }
        
    },[])

    return (
        <div className="course-form-container">
            <h3>{courseData[0]} Venue</h3>
            <form action="">
                
                <label htmlFor="name">Venue name</label>
                <input type="text" name='name' value={name} onChange={(e)=>setName(e.target.value)} />

                <label htmlFor="capacity">Capacity</label>
                <input type="number"  name='capacity' value={capacity} onChange={(e)=>setCapacity(e.target.value)}/>

                <label htmlFor="venue">VIP seat Capacity</label>
                <input type="number" name='vip' value={vip} onChange={(e)=>setVip(e.target.value)} />

                <label htmlFor="venue">Normal seat Capacity</label>
                <input type="number" name='normal' value={normal} onChange={(e)=>setNormal(e.target.value)} />

                <label htmlFor="venue">VVIP seat Capacity</label>
                <input type="number" name='vvip' value={vvip} onChange={(e)=>setvvip(e.target.value)} />

                <label htmlFor="courseImage">Image</label>
                <input type="file" name="courseImage" onChange={(e)=>setImage(e.target.files[0])}/>

                <button onClick={submitForm} className="create-btns">{courseData[0]} Venue</button>

            </form>
        </div>
    )
}


export default VenueForm