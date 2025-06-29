import PoliticsNews from '../components/PoliticsNews'
import BusinessNews from '../components/BusinessNews'
import Footer from '../components/Footer'
import { Navbar } from '../components/NavBar'


import React from 'react'
import MainNews from '../components/MainNews'

import TravelNews from '../components/TravelNews'
import SportsNews from '../components/SportsNews'
import BreakingNewsBanner from '../components/BreakingNewsBanner'

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
      <BreakingNewsBanner/>
    </div>
  )
}

export default Homepage
