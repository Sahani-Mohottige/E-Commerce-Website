import React, { useEffect, useState } from "react";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slices/productsSlice";

import ProductGrid from "./ProductGrid";
import { addToCart } from "../../redux/slices/cartSlice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetails = ({productId}) => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {selectedProduct, similarProducts, loading, error} = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productfetchId = productId || id;
  const userId = user ? user._id : null;

  // Debug logging
  console.log("ProductDetails - user:", user);
  console.log("ProductDetails - userId:", userId);
  console.log("ProductDetails - guestId:", guestId);

  useEffect(() => {
    if (productfetchId) {
      dispatch(fetchProductDetails(productfetchId));
      dispatch(fetchSimilarProducts(productfetchId));
    }
  }, [ dispatch, productfetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  // Add this new function to handle image changes and reset filters
  const handleImageChange = (imageUrl) => {
    setMainImage(imageUrl);
    // Reset filters when image changes
    setSelectedSize("");
    setSelectedColor("");
    setQuantity(1);
  };

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding to cart.", {
        description: "Both size and color must be selected to add the item to your cart.",
        duration: 3000,
      });
      return;
    }

    setIsButtonDisabled(true);

    console.log("Adding to cart with data:", {
      productId: productfetchId,
      quantity,
      size: selectedSize,
      color: selectedColor,
      userId,
      guestId,
    });

    try {
      const result = await dispatch(
        addToCart({
          productId: productfetchId,
          quantity,
          size: selectedSize,
          color: selectedColor,
          userId,
          guestId,
        })
      );

      console.log("Add to cart result:", result);

      if (addToCart.fulfilled.match(result)) {
        toast.success("Product added to cart successfully!", {
          description: `${quantity} ${quantity === 1 ? 'item' : 'items'} added in ${selectedSize} size and ${selectedColor} color.`,
          duration: 3000,
        });
        
        // Reset filters after successful add to cart
        setSelectedSize("");
        setSelectedColor("");
        setQuantity(1);
      } else {
        // Handle rejected case
        console.error("Add to cart failed:", result.payload);
        toast.error("Failed to add product to cart", {
          description: result.payload?.message || "Something went wrong",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add product to cart", {
        description: "Something went wrong",
        duration: 3000,
      });
    } finally {
      setIsButtonDisabled(false);
    }
  };

  if(loading){
    return <p>Loading...</p>
  }

  if(error){
    return <p>Error :{error}</p>
  }

  return (
    <div className="p-6">
      {selectedProduct && (
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg ">
        <div className="flex flex-col md:flex-row ">
          {/*left Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                onClick={() => handleImageChange(image.url)} // Changed this line
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border
                 ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                }}
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
                  className="w-full h-auto object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500x500?text=No+Image';
                  }}
                />
              )}
            </div>
          </div>
          {/*Mobile version*/}
          <div className="md:hidden flex overscroll-x-scroll space-x-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                onClick={() => handleImageChange(image.url)} // Changed this line
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border
                 ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                }}
              />
            ))}
          </div>
          {/*Right side*/}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              {selectedProduct.originalPrice &&
                `${selectedProduct.originalPrice}`}
            </p>
            <p className="text-xl text-gray-500 mb-2">
              ${selectedProduct.price}
            </p>
            <p className="text-xl text-gray-600 mb-4">
              {selectedProduct.description}
            </p>

            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border 
                      ${selectedColor === color ? "border-4 border-gray-800" : "border-gray-300"}`}
                    style={{
                      backgroundColor: color.toLocaleLowerCase(),
                      filter: "brightness(0.5)",
                    }}
                  ></button>
                ))}
              </div>
              {selectedColor && (
                <p className="text-sm text-gray-600 mt-1">Selected: {selectedColor}</p>
              )}
            </div>

            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border 
                      ${selectedSize === size ? "bg-black text-white" : ""}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedSize && (
                <p className="text-sm text-gray-600 mt-1">Selected: {selectedSize}</p>
              )}
            </div>
            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleQuantityChange("minus")}
                  className="px-2 py-1 rounded bg-gray-200 text-lg"
                >
                  -
                </button>
                <span className="text-lg"> {quantity}</span>
                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="px-2 py-1 rounded bg-gray-200 text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-900"}`}
            >
              {isButtonDisabled ? "Adding..." : "Add to Cart"}
            </button>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Characteristics:</h3>
              <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                <tbody>
                  <tr>
                    <td className="p-3 font-medium text-gray-700">Brand :</td>
                    <td className="p-3 text-gray-900">
                      {selectedProduct.brand}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-gray-700">
                      Material :
                    </td>
                    <td className="p-3 text-gray-900">
                      {selectedProduct.material}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            You May Also Like
          </h2>
           <div className="[&_.w-full]:w-60 [&>div]:gap-10 [&_img]:rounded-md">
            <ProductGrid products={similarProducts} loading={loading} error={error} />
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default ProductDetails;


