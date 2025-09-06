import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

// import your getOrderDetails action
// import { getOrderDetails } from "../redux/actions/orderActions"; // adjust path as needed

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  // Use fallback object to avoid crash if state.order is undefined
  const orderState = useSelector((state) => state.order || {});
  const orderDetails = orderState.order;
  const loading = orderState.loading;
  const error = orderState.error;

  useEffect(() => {
    if (orderId) {
      // dispatch(getOrderDetails(orderId)); // uncomment and adjust as needed
    }
  }, [dispatch, orderId]);

  const calculateEstimateDelivery = (createdAt) => {
    if (!createdAt) return "N/A";
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You for Your Order!
      </h1>
      {orderDetails ? (
        <div className="space-y-6">
          <div className="border-b pb-4 grid grid-cols-2">
            <div className="mb-2 text-gray-700 ">
              <h2 className="text-lg font-semibold">
                Order ID: {orderDetails._id || "N/A"}
              </h2>
              <p className="text-lg">
                Order Date:{" "}
                {orderDetails.createdAt
                  ? new Date(orderDetails.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <div className="text-sm text-gray-600">
              <p className="text-emerald-700">
                Estimated Delivery:{" "}
                {calculateEstimateDelivery(orderDetails.createdAt)}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {orderDetails.orderItems && orderDetails.orderItems.length > 0 ? (
              orderDetails.orderItems.map((item) => (
                <div
                  key={item.productId || item._id}
                  className="flex items-center mb-4 p-4 rounded-md shadow-sm"
                >
                  <img
                    src={item.images || item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      {item.color} | {item.size}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">${item.price}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No items found in this order.</div>
            )}
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-2 gap-8 pt-4">
            <div>
              <h4 className="font-semibold text-lg mb-2">Payment</h4>
              <p className="text-gray-700">{orderDetails.paymentMethod || "N/A"}</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Delivery</h4>
              <p className="text-gray-700">
                {orderDetails.shippingAddress?.address || "N/A"}
              </p>
              <p className="text-gray-700">
                {orderDetails.shippingAddress?.city || "N/A"},{" "}
                {orderDetails.shippingAddress?.country || "N/A"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-gray-500">No order details found.</div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
