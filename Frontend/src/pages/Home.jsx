import FeaturedCollection from '../components/Products/FeaturedCollection'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import Hero from '../components/Layout/Hero'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import React from 'react'

const placeholderProducts=[
  {
  id:1,
  name:"product1",
  price:100,
  images :[{url:"https://picsum.photos/500/500?random=1"}],
},
{
  id:2,
  name:"product1",
  price:100,
  images :[{url:"https://picsum.photos/500/500?random=2"}],
},
{
  id:3,
  name:"product1",
  price:100,
  images :[{url:"https://picsum.photos/500/500?random=3"}],
},
{
  id:4,
  name:"product1",
  price:100,
  images :[{url:"https://picsum.photos/500/500?random=4"}],
},
{
  id:5,
  name:"product1",
  price:100,
  images :[{url:"https://picsum.photos/500/500?random=5"}],
},
{
  id:6,
  name:"product1",
  price:100,
  images :[{url:"https://picsum.photos/500/500?random=6"}],
},
{
  id:7,
  name:"product1",
  price:100,
  images :[{url:"https://picsum.photos/500/500?random=7"}],
},
{
  id:8,
  name:"product1",
  price:100,
  images :[{url:"https://picsum.photos/500/500?random=8"}],
},
]

const Home = () => {
  return (
    <div>
      <Hero/>
      <GenderCollectionSection/>
      <NewArrivals/>
<h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
      <ProductDetails/>
      
      <div className='container mx-auto'>
        <h2 className='text-3xl text-center font-bold mb-4'>
          Top Wears for Women
        </h2>
        <ProductGrid products={placeholderProducts}/>
      </div>
      <FeaturedCollection/>
</div>
  )
}

export default Home