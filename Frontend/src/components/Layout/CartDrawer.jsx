import CartContents from "../Cart/CartContents";
import { IoMdClose } from "react-icons/io";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;
  
  const handleCheckout = () => {
    toggleCartDrawer();
    if(!user){
      navigate("/login?redirect=/checkout");
      return;
    }else{
          navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 md:w-[30rem] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40
        ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Header with close button */}
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={toggleCartDrawer}
          className="text-gray-500 hover:text-black"
        >
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Scrollable cart content */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
        {cart && cart?.products?.length>0 ? (
          <CartContents cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Your cart is empty.</p>
        )}
        {/* Example cart content */}
       
      </div>

      {/* Checkout button fixed at the bottom */}
      <div className="p-4 bg-white sticky bottom-0">
         {cart && cart?.products?.length>0 && (
         <><button
          onClick={handleCheckout}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-700 transition-colors"
        >
          Checkout
        </button>
           <p className="text-xs text-gray-500 mt-2 tracking-tighter">
          Shipping, taxes, and discount codes calculated at checkout.
        </p></>
      )}
      </div>
    </div>
  );
};
      
export default CartDrawer;
