import PoliticsNews from '../components/PoliticsNews'
import BusinessNews from '../components/BusinessNews'
import Footer from '../components/Footer'
import { Navbar } from '../components/NavBar'


import React from 'react'
import MainNews from '../components/MainNews'

import TravelNews from '../components/TravelNews'
import SportsNews from '../components/SportsNews'

const Homepage = () => {
  return (
    <div>
      <Navbar/>
      <MainNews/>
      <BusinessNews/>
      <PoliticsNews/>
      <SportsNews/>
      <TravelNews/>
      <Footer/>
    </div>
  )
}

export default Homepage
