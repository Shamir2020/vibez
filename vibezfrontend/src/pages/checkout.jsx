import { useState } from "react"
import Footer from "../components/footer"
import Navbar2 from "../components/navbar2"
import './css/checkout.css'
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"

const Checkout = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [ticketCount, setTicketCount] = useState('')
    const [ticketType, setTicketType] = useState('')

    const token = localStorage.getItem('token')
    const eventId = useParams().id


    const SubmitForm = async (e)=>{
        e.preventDefault()

        if (!token) {
            toast.error('Login First')
        }

        else if (!name || !email || !phone || !ticketCount || !ticketType) {
            toast.error("Fill out all the fields")
        }
        else {
            const response = await fetch("/api/order", {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    ticketCount: ticketCount,
                    ticketType: ticketType,
                    token: token,
                    eventId: eventId
                })
            })

            const result = await response.json()

            console.log(result)

            if (response.status == 200){
                console.log(result)
                window.location.replace(result.url)
            }
        }
    }

    return (
        <>
            <Navbar2 />
            <div className="checkoutContainer">
                <div className="checkoutInside">
                    <h3>Checkout now</h3>

                    <form action="">
                        <label htmlFor="name">Customer's Name</label>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} name="name" required placeholder="Full name here"/>

                        <label htmlFor="email">Email</label>
                        <input type="email" value={email} name="email" onChange={(e)=>setEmail(e.target.value)} required placeholder="Email here" />

                        <label htmlFor="phone">Phone number</label>
                        <input type="number" value={phone} name="phone" onChange={(e)=>setPhone(e.target.value)} required placeholder="Mobile number here" />

                        <label htmlFor="">Ticket type</label>
                        <select value={ticketType} name="ticketType" onChange={(e)=>setTicketType(e.target.value)} id="">
                            <option value="">Select Ticket Type</option>
                            <option value="normal">Normal</option>
                            <option value="vip">VIP</option>
                            <option value="vvip">VVIP</option>
                        </select>

                        <label htmlFor="ticketCount">No. of tickets</label>
                        <div className="">
                            <input type="number" value={ticketCount} name="ticketCount" onChange={(e)=>setTicketCount(e.target.value)} />
                            <button className="decrease">-</button>
                            <button className="increase">+</button>
                        </div>

                        <button onClick={SubmitForm} className="payment-btn">Go to Payment</button>

                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Checkout