import React from 'react'

const selectedProduct = {
  name: "Jacket",
  price: 79.99,
  originalPrice: 99.99,
  description: "A warm, stylish jacket perfect for chilly days.",
  brand: "UrbanWear",
  material: "Polyester",
  sizes: ["S","M","L","XL"],
  colors:["Red","Black"],
  images: [
    {
      url: "https://picsum.photos/500/500?random=1",
      altText: "Front view of the jacket1",
    },
      {
      url: "https://picsum.photos/500/500?random=2",
      altText: "Front view of the jacket2",
    },
  ],
};


const ProductDetails = () => {
  return (
    <div className='p-6'>
      <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg '>
        <div className='flex flex-col md:flex-row '>
          {/*left Thumbnails */}
          <div className='hidden md:flex flex-col space-y-4 mr-6'>
            {selectedProduct.images.map((image,index)=>(
              <img 
              key={index}
              src={image.url}
              alt={image.altText||`Thumbnail ${index}`}
              className='w-20 h-20 object-cover rounded-lg cursor-pointer border'
              />
            ))}
          </div>
          {/*main image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img 
              src={selectedProduct.images[0]?.url}
              alt="Main Product"
              className="w-full h-1500px md:h- object-cover rounded-lg"
              />
            </div>
          </div>
           {/*Mobile version*/}
           <div className='md:hidden flex overscroll-x-scroll space-x-4 mr-6'>
             {selectedProduct.images.map((image,index)=>(
              <img 
              key={index}
              src={image.url}
              alt={image.altText||`Thumbnail ${index}`}
              className='w-20 h-20 mb-6 object-cover rounded-lg cursor-pointer border'
              />
            ))}
           </div>
            {/*Right side*/}
            <div className="md:w-1/2 md:ml-10">
              <h1 className='text-2xl md:text-3xl font-semibold mb-2'>
                {selectedProduct.name}
              </h1>
              <p className='text-lg text-gray-600 mb-1 line-through'>
                {selectedProduct.originalPrice && 
                `${selectedProduct.originalPrice}`}
              </p>
              <p className='text-xl text-gray-500 mb-2'>
                ${selectedProduct.price}
              </p>
                <p className='text-xl text-gray-600 mb-4'>
                {selectedProduct.description}
              </p>
              
              <div className='mb-4'>
                <p className='text-gray-700'>Color:</p>
                <div className='flex gap-2 mt-2'>
                  {selectedProduct.colors.map((color)=>(
                    <button
                    key={color}
                    className='w-8 h-8 rounded-full'
                    style={{
                      backgroundColor:color.toLocaleLowerCase(),
                      filter:"brightness(0.5)"
                    }}
                    ></button>
                  ))}
                </div>
              </div>
              
               <div className='mb-4'>
                <p className='text-gray-700'>Size:</p>
                <div className='flex gap-2 mt-2'>
                  {selectedProduct.sizes.map((size)=>(
                    <button
                    key={size}
                    className='px-4 py-2 rounded border'
                    >{size}</button>
                  ))}
                </div>
              </div>
              
              <div className='mb-6'>
                <p className='text-gray-700'>Quantity:</p>
                <div className="flex items-center space-x-4 mt-2">
                    <button className='px-2 py-1 rounded bg-gray-200 text-lg'>
                      -
                      </button>
                    <span className="text-lg"> 1</span>
                     <button className='px-2 py-1 rounded bg-gray-200 text-lg'>
                      +
                      </button>
                </div>
              </div>
              <button className="bg-black text-white py-2 px-6 rounded w-full mb-4">
                Add to Cart
                </button>
                
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Product Details</h3>
                  <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                    <tbody>
                  <tr>
                    <td className="p-3 font-medium text-gray-700">Brand</td>
                    <td className="p-3 text-gray-900">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-gray-700">Material</td>
                    <td className="p-3 text-gray-900">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails