import React, { useEffect, useState } from 'react';

const MyOrderspage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch orders
    setTimeout(() => {
      const mockOrders = [
        {
          id: '12345',
          createdAt: new Date(),
          shippingAddress: { city: 'New York', country: 'USA' },
          orderItems: [
            {
              name: 'Product 1',
              image: 'https://picsum.photos/500/500?random=1',
            },
          ],
          totalPrice: 100,
          isPaid: true,
        },
        {
          id: '67890',
          createdAt: new Date(),
          shippingAddress: { city: 'London', country: 'UK' },
          orderItems: [
            {
              name: 'Product 2',
              image: 'https://picsum.photos/500/500?random=2',
            },
          ],
          totalPrice: 200,
          isPaid: false,
        },
      ];
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Created</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Shipping Address</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Items</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{order.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                    {" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {order.shippingAddress 
                    ? `${order.shippingAddress.city}, ${order.shippingAddress.country}}`: "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {order.orderItems.length}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    ${order.totalPrice}
                    </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded
                         ${ order.isPaid
                          ? 'bg-green-100 text-green-600'
                          : 'bg-yellow-100 text-red-600'
                      } px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}
                    >
                      {order.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-4">
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrderspage;
