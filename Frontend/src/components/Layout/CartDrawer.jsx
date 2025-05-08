import CartContents from '../Cart/CartContents';
import { IoMdClose } from 'react-icons/io';

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 md:w-[30rem] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40
        ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      {/* Header with close button */}
      <div className="flex items-center justify-between p-4 border-b">
        <button onClick={toggleCartDrawer} className="text-gray-500 hover:text-black">
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Scrollable cart content */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
          <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
        {/* Example cart content */}
       <CartContents/>
      </div>

      {/* Checkout section fixed at the bottom */}
      <div className="p-4 bg-white sticky bottom-0">
        <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-700 transition-colors">
          Checkout
        </button>
        <p className="text-xs text-gray-500 mt-2 tracking-tighter">
          Shipping, taxes, and discount codes calculated at checkout.
        </p>
      </div>
    </div>
  );
};

export default CartDrawer;
