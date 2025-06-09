import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const cart = {
  products: [
    {
      id: 1,
      name: 'product1',
      price: 100,
      images: [{ url: 'https://picsum.photos/500/500?random=1' }],
    },
    {
      id: 2,
      name: 'product1',
      price: 100,
      images: [{ url: 'https://picsum.photos/500/500?random=2' }],
    },
    {
      id: 3,
      name: 'product1',
      price: 100,
      images: [{ url: 'https://picsum.photos/500/500?random=3' }],
    },
    {
      id: 4,
      name: 'product1',
      price: 100,
      images: [{ url: 'https://picsum.photos/500/500?random=4' }],
    },
  ],
  totalPrice: 195,
};

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const handleCreateCheckout = (e) => {
    e.preventDefault();
    setCheckoutId('123');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto py-10 px-6">
      {/* Left Section */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout} className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Contact Details</h3>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value="user@example.com"
              className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed text-gray-500"
              disabled
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Delivery</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={shippingAddress.firstName}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, firstName: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={shippingAddress.lastName}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, lastName: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={shippingAddress.address}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, address: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, city: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Postal Code</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={shippingAddress.postalCode}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={shippingAddress.country}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, country: e.target.value })
                }
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={shippingAddress.phone}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, phone: e.target.value })
                }
                required
              />
            </div>

            <div className="mt-6">
              {!checkoutId ? (
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-700 transition"
                >
                  Continue to Payment
                </button>
              ) : (
                <div className="p-4 border rounded bg-white shadow">
                  <h3 className="text-lg font-semibold text-green-600 mb-2">Pay with PayPal</h3>
                  <p className="text-sm text-gray-600">Redirecting to PayPal for payment...</p>
                  {/* You can place PayPal SDK integration or button here */}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
