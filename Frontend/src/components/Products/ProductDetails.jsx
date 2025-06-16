import React, { useEffect, useState } from 'react'

import ProductGrid from './ProductGrid';
import {toast} from "sonner"

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

const similarProducts=[
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
}
]

const ProductDetails = () => {

  const[mainImage,setMainImage] =useState("");
  const[selectedSize,setSelectedSize] =useState("");
  const[selectedColor,setSelectedColor] =useState("");
  const[quantity,setQuantity] =useState(1);
  const [isButtonDisabled,setIsButtonDisabled] = useState(false);

  useEffect(()=>{
    if(selectedProduct?.images?.length>0){
      setMainImage(selectedProduct.images[0].url);
    }
  },[selectedProduct]);

  const handleQuantityChange = (action) =>{
    if(action === "plus") setQuantity((prev)=>prev +1);
    if(action === "minus" && quantity > 1) setQuantity((prev)=>prev-1);
  }

  const handleAddToCart =()=>{
    if(!selectedSize || !selectedColor){
      toast.error("Please select a size and color before adding to cart.",{
        duration :1000,
      });
      return;
    }
    
    setIsButtonDisabled(true);

    setTimeout(() =>{
      toast.success("product added to cart!",{
        duration:1000,
      });
      setIsButtonDisabled(false);
    },500);
    
  };
  
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
              onClick={()=>setMainImage(image.url)}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border
                 ${mainImage === image.url?"border-black":"border-gray-300"}`}
              />
            ))}
          </div>
          {/*main image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              {mainImage && ( 
              <img 
              src={mainImage}
              alt="Main Product"
              className="w-full h-auto md:h- object-cover rounded-lg"
              />)}
            </div>
          </div>
           {/*Mobile version*/}
           <div className='md:hidden flex overscroll-x-scroll space-x-4 mr-6'>
             {selectedProduct.images.map((image,index)=>(
              <img 
              key={index}
              src={image.url}
              alt={image.altText||`Thumbnail ${index}`}
              onClick={()=>setMainImage(image.url)}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border
                 ${mainImage === image.url?"border-black":"border-gray-300"}`}
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
                    onClick={()=>setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border 
                      ${selectedColor === color? "border-4 border-gray-800":"border-gray-300"}`}
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
                    onClick={()=>setSelectedSize(size)}
                    className={`px-4 py-2 rounded border 
                      ${selectedSize === size? "bg-black text-white":""}`}
                    >{size}</button>
                  ))}
                </div>
              </div>
              
              <div className='mb-6'>
                <p className='text-gray-700'>Quantity:</p>
                <div className="flex items-center space-x-4 mt-2">
                    <button onClick={()=>handleQuantityChange("minus")} className='px-2 py-1 rounded bg-gray-200 text-lg'>
                      -
                      </button>
                    <span className="text-lg"> {quantity}</span>
                     <button onClick={()=>handleQuantityChange("plus")} className='px-2 py-1 rounded bg-gray-200 text-lg'>
                      +
                      </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button 
              onClick={handleAddToCart}
              className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisabled? "cursor-not-allowed":"hover:bg-gray-900"}`}>
               {isButtonDisabled?"Adding...": "Add to Cart"}
                </button>
                
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Characteristics:</h3>
                  <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                    <tbody>
                  <tr>
                    <td className="p-3 font-medium text-gray-700">Brand :</td>
                    <td className="p-3 text-gray-900">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-gray-700">Material :</td>
                    <td className="p-3 text-gray-900">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
        </div>
        <div className='mt-20'>
          <h2 className="text-2xl text-center font-medium mb-4">
            You May Also Like
          </h2>
          <div className="[&_.w-full]:w-60 [&>div]:gap-10 [&_img]:rounded-md">
          <ProductGrid products={similarProducts}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails