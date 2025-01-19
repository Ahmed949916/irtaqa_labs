import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import ContactUs from './ContactUs'
import ServicesOffered from './ServicesOffered'
import OurMission from './OurMission'

const Home = () => {
  return (
    <div><Navbar/>
    <Hero/>
    <ServicesOffered/>
    <OurMission/>
    <ContactUs/></div>
  )
}

export default Home