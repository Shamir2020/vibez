

import Footer from '../components/footer'
import Navbar from '../components/navbar'
import './css/about.css'

const AboutPage = () => {
    return (
        <>
            <Navbar />
            <section class="about-section">
                <div class="about-container">
                    <h2 style={{textAlign:'center'}}>About Us</h2>
                    <p>We are passionate about bringing music lovers together to experience unforgettable concerts. Our platform makes it easy for you to discover upcoming events, purchase tickets, and immerse yourself in the excitement of live performances.</p>
                    <p>With a diverse range of concerts spanning various genres and venues, there's something for everyone to enjoy. Join us in celebrating the joy of live music and create memories that will last a lifetime!</p>
                </div>
            </section>
           
           <Footer />
        </>
    )
}

export default AboutPage