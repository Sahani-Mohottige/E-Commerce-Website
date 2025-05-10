import { Link } from 'react-router-dom'
import React from 'react'
import heroImg from "../../assets/rabbit-hero.webp"

const Hero = () => {
  return (
    <section className="relative">
  <img
    src={heroImg}
    alt="Rabbit"
    className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
  />
  <div className="absolute inset-0 flex items-center justify-center bg-opacity-5 text-white px-4">
    <div className="text-center max-w-md">
      <h1 className="text-5xl font-bold uppercase tracking-tighter mb-4">
        Vacation<br />Ready
      </h1>
      <p className="md:text-lg text-sm tracking-tighter mb-6">
        Explore our vacation-ready outfits with fast worldwide shipping.
      </p>
      <Link
        to="#"
        className="inline-block bg-white text-black font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
      >
        Shop Now
      </Link>
    </div>
    
  </div>
 
</section>
  )
}

export default Hero