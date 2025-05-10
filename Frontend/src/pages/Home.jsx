import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import Hero from '../components/Layout/Hero'
import NewArrivals from '../components/Products/NewArrivals'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Hero/>
      <GenderCollectionSection/>
      <NewArrivals/>
    </div>
    
  )
}

export default Home