import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";

const CartContents = () => {
  const cartProducts = [
    {
      productId: 1,
      name: "T shirt",
      size: "M",
      color: "red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 2,
      name: "Jeans",
      size: "L",
      color: "blue",
      quantity: 1,
      price: 25,
      image: "https://picsum.photos/200?random=2",
    },
  ];
  return (
    <div className="space-y-6 px-4">
      {cartProducts.map((product, index) => (
        <div key={index} className="flex items-start gap-4 border-b pb-6">
          {/* Product image */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover rounded-md"
            />
          </div>

          {/* Product info */}
          <div className="flex flex-col flex-grow">
            <h3 className="text-sm font-semibold text-gray-800">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Size: {product.size} | Color: {product.color}
            </p>

            {/* Quantity controls */}
            <div className="flex items-center gap-2 mt-3">
              <button className="border rounded px-2 text-xl font-medium  hover:bg-gray-200">
                -
              </button>
              <span className="text-sm font-medium">{product.quantity}</span>
              <button className="border rounded px-2 text-xl font-medium  hover:bg-gray-200">
                +
              </button>
            </div>
          </div>
          <div>
            <p>$ {product.price.toLocaleString()}</p>
            <button
              className="mt-4 text-red-500 hover:text-red-700 transition-colors"
              aria-label="Remove item"
            >
              <RiDeleteBin3Line className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
