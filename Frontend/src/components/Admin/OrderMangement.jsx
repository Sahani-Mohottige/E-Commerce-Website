import React, { useState } from "react";

import { ChevronDown } from "lucide-react";

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: "#1",
      customer: "Admin User",
      totalPrice: "$199.96",
      status: "Processing",
    },
    {
      id: "#2",
      customer: "Admin User",
      totalPrice: "$40",
      status: "Processing",
    },
    {
      id: "#3",
      customer: "Admin User",
      totalPrice: "$39.99",
      status: "Processing",
    },
    {
      id: "#4",
      customer: "Admin User",
      totalPrice: "$39.99",
      status: "Processing",
    },
  ]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const markAsDelivered = (orderId) => {
    updateOrderStatus(orderId, "Delivered");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-blue-500 text-white";
      case "Shipped":
        return "bg-yellow-500 text-white";
      case "Delivered":
        return "bg-green-500 text-white";
      case "Cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="mt-12 lg:mt-0">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Order Management
      </h2>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {order.totalPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative group">
                      <button
                        className={`inline-flex items-center px-3 py-2 rounded-md text-xs font-medium ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                        <ChevronDown className="w-3 h-3 ml-1" />
                      </button>

                      {/* Status Dropdown Options */}
                      <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10 hidden group-hover:block">
                        {[
                          "Processing",
                          "Shipped",
                          "Delivered",
                          "Cancelled",
                        ].map((status) => (
                          <button
                            key={status}
                            onClick={() => updateOrderStatus(order.id, status)}
                            className="block w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => markAsDelivered(order.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {orders.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Processing</h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {orders.filter((order) => order.status === "Processing").length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Delivered</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {orders.filter((order) => order.status === "Delivered").length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            $
            {orders
              .reduce(
                (sum, order) =>
                  sum + parseFloat(order.totalPrice.replace("$", "")),
                0,
              )
              .toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
