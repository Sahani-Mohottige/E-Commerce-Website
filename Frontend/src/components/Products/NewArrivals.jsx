import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import React, { useEffect, useRef, useState } from 'react'

import { Link } from 'react-router-dom'

const NewArrivals = () => {
    const scrollRef= useRef(null);
    const [isDragging,setIsDragging] = useState(false);
    const [startX,setStartX] =useState(0);
    const [scrollLeft,setScrollLeft] = useState(false);
    const [canScrollLeft,setCanScrollLeft] = useState(false);
    const [canScrollRight,setCanScrollRight] = useState(true);


    const newArrivals =[
        {
            id:"1",
            name:"stylish Jacket",
            price: 120,
            images: [
                {
                    url:"https://picsum.photos/500/500?random=1",
                    altText:"stylish Jacket"
                }
            ]
        },
        {
            id:"2",
            name:"stylish Jacket",
            price: 120,
            images: [
                {
                    url:"https://picsum.photos/500/500?random=2",
                    altText:"stylish Jacket"
                }
            ]
        },
        {
            id:"3",
            name:"stylish Jacket",
            price: 120,
            images: [
                {
                    url:"https://picsum.photos/500/500?random=3",
                    altText:"stylish Jacket"
                }
            ]
        },
        {
            id:"4",
            name:"stylish Jacket",
            price: 120,
            images: [
                {
                    url:"https://picsum.photos/500/500?random=4",
                    altText:"stylish Jacket"
                }
            ]
        },
        {
            id:"5",
            name:"stylish Jacket",
            price: 120,
            images: [
                {
                    url:"https://picsum.photos/500/500?random=5",
                    altText:"stylish Jacket"
                }
            ]
        },
        {
            id:"6",
            name:"stylish Jacket",
            price: 120,
            images: [
                {
                    url:"https://picsum.photos/500/500?random=6",
                    altText:"stylish Jacket"
                }
            ]
        },
        {
            id:"7",
            name:"stylish Jacket",
            price: 120,
            images: [
                {
                    url:"https://picsum.photos/500/500?random=7",
                    altText:"stylish Jacket"
                }
            ]
        },
        {
            id:"8",
            name:"stylish Jacket",
            price: 120,
            images: [
                {
                    url:"https://picsum.photos/500/500?random=8",
                    altText:"stylish Jacket"
                }
            ]
        }
]

const handleOnMouseDown = (e) =>{
  setIsDragging(true);
  setStartX(e.pageX - scrollRef.current.offsetLeft);
  setScrollLeft(scrollRef.current.scrollLeft);
}

const handleOnMouseMove = (e) =>{
  if (!isDragging)return;
  const x = e.pageX - scrollRef.current.offsetLeft;
  const walk =x-startX;
  scrollRef.current.scrollLeft = scrollLeft - walk;
}

const handleOnMouseUpOrLeave = () =>{
  setIsDragging(false);
}

const scroll = (direction) =>{
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({left: scrollAmount,behavior :"smooth"});
}

//update scroll buttons
const updateScrollButtons=()=>{
    const container =scrollRef.current;

    if(container){
        const leftScroll = container.scrollLeft;
        const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth;

        setCanScrollLeft(leftScroll>0);
        setCanScrollRight(rightScrollable);
    }
    console.log({
        scrollLeft:container.scrollLeft,
         clientWidth:container.clientWidth,
          containerScrollWidth:container.scrollWidth,
          offsetLeft:scrollRef.current.offsetLeft
    })
}

useEffect(() => {
  const container = scrollRef.current;
  if (container) {
    container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
    };
  }
}, []);

  return (
    <section className="py-16 px-4 lg:px-0">
      {/* Header */}
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button onClick={()=> scroll("left")}
          disabled={!canScrollLeft}
          className={`p-2 rounded-lg border-1
           ${canScrollLeft? "bg-white text-black":"bg-gray-400 cursor-not-allowed"}`}>
            <FiChevronLeft size={20} />
          </button>
          <button onClick={()=> scroll("right")}
          disabled={!canScrollRight}
           className={`p-2 rounded-lg border-1
           ${canScrollRight? "bg-white text-black":"bg-gray-400 cursor-not-allowed"}`}>
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Scrollable Product Cards */}
      <div className="overflow-x-scroll px-4">
        <div ref={scrollRef} 
        className={`container mx-auto overflow-x-scroll flex space-x-4 relative ${isDragging ? "cursor-grabbing":"cursor-grab"}`}
        onMouseDown={handleOnMouseDown}
        onMouseMove={handleOnMouseMove}
        onMouseUpOrLeave={handleOnMouseUpOrLeave}
        >
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] bg-white rounded-lg relative"
            >
              <img
                src={product.images[0]?.url}
                alt={product.images[0]?.altText || product.name}
                className="w-full h-[400px]  object-cover rounded-lg"
                draggable="false"
              />
              <div className="p-4  absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white rounded-b-lg">
                <Link
                  to={`/product/${product.id}`}
                  className="block text-lg font-semibold hover:underline"
                >
                  {product.name}
                </Link>
                <p className="mt-1">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
   
}

export default NewArrivals