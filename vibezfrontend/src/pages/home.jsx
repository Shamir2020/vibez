import FeaturedConcerts from "../components/featuredConcerts"
import Footer from "../components/footer"
import Navbar from "../components/navbar"
import { useState } from "react"

const HomePage = ()=>{
    
    return (
        <>
            <Navbar />
            <FeaturedConcerts />
            <Footer />
        </>
    )
}

export default HomePage