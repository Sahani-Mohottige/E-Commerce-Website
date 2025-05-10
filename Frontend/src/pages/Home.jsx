import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import Hero from '../components/Layout/Hero'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Hero/>
      <GenderCollectionSection/>
      <NewArrivals/>
<h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
      <ProductDetails/>
</div>
  )
}

export default Home