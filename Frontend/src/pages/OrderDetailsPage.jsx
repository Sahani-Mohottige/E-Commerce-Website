import { Link, useParams } from "react-router-dom"; // ✅ Added Link import
import React, { useEffect, useState } from "react";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null); // ✅ Fixed: correct useState syntax

  useEffect(() => {
    const mockOrderDetails = {
      _id: id,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "PayPal",
      shippingMethod: "Standard",
      shippingAddress: { city: "New York", country: "USA" },
      orderItems: [
        {
          productId: 1,
          name: "Product 1",
          price: 100,
          quantity: 1,
          images: ["https://picsum.photos/500/500?random=1"],
        },
        {
          productId: 2,
          name: "Product 2",
          price: 120,
          quantity: 1,
          images: ["https://picsum.photos/500/500?random=2"],
        },
        {
          productId: 3,
          name: "Product 3",
          price: 130,
          quantity: 1,
          images: ["https://picsum.photos/500/500?random=3"],
        },
        {
          productId: 4,
          name: "Product 4",
          price: 140,
          quantity: 1,
          images: ["https://picsum.photos/500/500?random=4"],
        },
        {
          productId: 5,
          name: "Product 5",
          price: 150,
          quantity: 1,
          images: ["https://picsum.photos/500/500?random=5"],
        },
        {
          productId: 6,
          name: "Product 6",
          price: 160,
          quantity: 1,
          images: ["https://picsum.photos/500/500?random=6"],
        },
        {
          productId: 7,
          name: "Product 7",
          price: 170,
          quantity: 1,
          images: ["https://picsum.photos/500/500?random=7"],
        },
        {
          productId: 8,
          name: "Product 8",
          price: 180,
          quantity: 1,
          images: ["https://picsum.photos/500/500?random=8"],
        },
      ],
    };
    setOrderDetails(mockOrderDetails);
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      {!orderDetails ? (
        <p>No Order Details Found.</p>
      ) : (
        <div className="">
          {/* Order info */}
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3>Order ID: #{orderDetails._id}</h3>
              <p>{new Date(orderDetails.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span
                className={`${
                  orderDetails.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700" // ✅ Fixed: corrected color classes
                } px-3 py-1 rounded-full text-sm font-medium text-center`}
              >
                {orderDetails.isPaid ? "Approved" : "Pending"}
              </span>
              <span
                className={`${
                  orderDetails.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700" // ✅ Fixed: corrected color classes
                } px-3 py-1 rounded-full text-sm font-medium text-center`}
              >
                {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}{" "}
                {/* ✅ Fixed: check isDelivered not isPaid */}
              </span>
            </div>
          </div>

          {/* Customer, payment, shipping info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-lg mb-2">Payment Info</h4>
              <p>Payment Method: {orderDetails.paymentMethod}</p>
              <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Shipping Info</h4>
              <p>Shipping Method: {orderDetails.shippingMethod}</p>
              <p>
                Address:{" "}
                {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
              </p>
            </div>
          </div>

          {/* Product List */}
          <div className="overflow-auto mb-8">
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Unit Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {" "}
                {/* ✅ Added missing tbody */}
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.productId}>
                    <td className="px-6 py-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      ${item.price}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      ${item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link to="/my-orders" className="text-blue-500 hover:underline">
            ← Back to my orders
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
