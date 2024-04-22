import Footer from "../components/footer"
import Navbar from "../components/navbar"

import './css/contact.css'
const ContactPage = () => {
    return (
        <>
            <Navbar />
            <section class="contact-form">
                <form action="https://formsubmit.co/labibfarhan24@gmail.com" method="POST" class="contact-container">
                    <h2>Contact Us</h2>
                    <p>Have a question or feedback? Fill out the form below to get in touch with us.</p>
                    <form action="#" method="POST">
                        <div class="form-group">
                            <label for="name">Name:</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div class="form-group">
                            <label for="message">Message:</label>
                            <textarea id="message" name="message" rows="4" required></textarea>
                        </div>
                        <div className="form-group">
                            <button class="btn">Submit</button>
                        </div>
                    </form>
                </form>
            </section>
            <Footer />
        </>
    )

}

export default ContactPage