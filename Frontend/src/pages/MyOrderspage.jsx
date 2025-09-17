import { CheckCircle, Clock, Package } from "lucide-react";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError("");
    // Remove withCredentials if you are using JWT in header only
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || localStorage.getItem("userToken") || ""}`
        }
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message ||
          err.message ||
          "Failed to fetch orders"
        );
        setLoading(false);
      });
  }, []);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    setCancellingOrderId(orderId);
    try {
      // Use the status update endpoint instead of /cancel
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}/status`,
        { status: "Cancelled" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || localStorage.getItem("userToken") || ""}`,
          },
        }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, isCancelled: true, status: "Cancelled" }
            : order
        )
      );
      alert("Order cancelled successfully.");
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        err.message ||
        "Failed to cancel order"
      );
    }
    setCancellingOrderId(null);
  };

  const getStatusIcon = (isPaid, isDelivered) => {
    if (isDelivered) return <CheckCircle className="w-5 h-5 text-emerald-600" />;
    if (isPaid) return <Clock className="w-5 h-5 text-indigo-500" />;
    return <Package className="w-5 h-5 text-slate-400" />;
  };

  const getStatusText = (isPaid, isDelivered, status) => {
    if (status === "Cancelled") return "Cancelled";
    if (isDelivered) return "Delivered";
    if (isPaid) return "Processing";
    return "Pending Payment";
  };

  const getStatusColor = (isPaid, isDelivered, status) => {
    if (status === "Cancelled") return "bg-red-100 text-red-700 border border-red-200";
    if (isDelivered) return "bg-emerald-100 text-emerald-700 border border-emerald-200";
    if (isPaid) return "bg-indigo-100 text-indigo-700 border border-indigo-200";
    return "bg-slate-100 text-slate-600 border border-slate-200";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center 
      h-64">
        <div className="text-center">
          <Package className="mx-auto h-12 w-12 text-gray-400 animate-pulse" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Loading your orders...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Orders</h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-800">My Orders</h1>
        <p className="text-slate-500 mt-2">Track and manage your order history</p>
      </div>

      {orders?.length > 0 ? (
        <div className="bg-white rounded-xl shadow-lg border border-green-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full border border-green-200 border-collapse">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border border-green-200">
                    Order Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border border-green-200">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border border-green-200">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border border-green-200">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border border-green-200">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border border-green-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    onClick={() => handleRowClick(order._id)}
                    className="cursor-pointer hover:bg-green-100 transition-colors group"
                  >
                    <td className="px-6 py-4 border border-green-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          {order.orderItems?.[0]?.image ? (
                            <img
                              src={order.orderItems[0].image}
                              alt={order.orderItems[0].name}
                              className="h-12 w-12 object-cover rounded-lg border border-slate-200"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/48x48?text=No+Image';
                              }}
                            />
                          ) : (
                            <div className="h-12 w-12 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center">
                              <Package className="h-6 w-6 text-slate-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                            Order #{order._id?.slice(-8) || 'N/A'}
                          </div>
                          <div className="text-xs text-slate-500">
                            {order.shippingAddress?.city && order.shippingAddress?.country
                              ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                              : 'Shipping address not available'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 border border-green-200">
                      {order.orderItems?.length || 0} {order.orderItems?.length === 1 ? 'item' : 'items'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-800 border border-green-200">
                      ${order.totalPrice?.toFixed(2) || '0.00'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-green-200">
                      <div className="flex items-center">
                        {getStatusIcon(order.isPaid, order.isDelivered)}
                        <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.isPaid, order.isDelivered, order.status)}`}>
                          {getStatusText(order.isPaid, order.isDelivered, order.status)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 border border-green-200">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm border border-green-200"
                      onClick={e => e.stopPropagation()}
                    >
                      {order.isDelivered || order.isCancelled ? (
                        <span className="text-slate-400 text-xs">
                          {order.isCancelled ? "Cancelled" : "Not allowed"}
                        </span>
                      ) : (
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold disabled:opacity-60"
                          disabled={cancellingOrderId === order._id}
                          onClick={() => handleCancelOrder(order._id)}
                        >
                          {cancellingOrderId === order._id ? "Cancelling..." : "Cancel Order"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-2 text-sm font-medium text-slate-800">No orders yet</h3>
          <p className="mt-1 text-sm text-slate-500">
            Start shopping to see your orders here.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Start Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;

