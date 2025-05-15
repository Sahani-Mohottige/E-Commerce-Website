import React from 'react'

const FeaturedCollection = () => {
  return (
    <section className='container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl'>
      {/*left content */}
      <div className='lg:w-1/2 p-8 text-center lg:text-left'>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Comfort and Style
        </h2>
        <h2 className='text-4xl lg:text-5xl font-bold mb-6'></h2>
      <p>
        Discover high quality,comfortable clothing that effortlessly blends fashion and function.
     </p>
    </div>
    </section>
  )
}

export default FeaturedCollection