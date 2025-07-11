import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import heroImg from "../../assets/fam.jpg";
import heroImg2 from "../../assets/rabbit-hero.webp";
import heroImg3 from "../../assets/beachParty.jpg";

const Hero = () => {
  const images = [heroImg, heroImg2, heroImg3];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative overflow-hidden">
      {/* Background images for smooth crossfade */}
      <div className="relative w-full h-[400px] md:h-[600px] lg:h-[750px]">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Hero"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-opacity-5 text-white px-4">
        <div className="text-center max-w-md">
          <h1 className="text-5xl font-bold uppercase tracking-tight mb-8">
            Vacation
            <br />
            Ready
          </h1>
          <p className="md:text-lg text-lg font-semibold mb-8">
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

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? "bg-white scale-110"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
