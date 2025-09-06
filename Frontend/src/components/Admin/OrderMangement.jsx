import { ChevronDown, Eye, Package, Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  deleteAdminOrder,
  fetchAllOrders,
  updateOrderStatus,
} from "../../redux/slices/adminOrderSlice";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState({});

  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    dispatch(fetchAllOrders({ token: adminToken }));
  }, [dispatch, adminToken]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await dispatch(
        updateOrderStatus({ id: orderId, status: newStatus, token: adminToken })
      ).unwrap();

      toast.success("Order status updated", {
        description: `Order ${orderId} status changed to ${newStatus}`,
      });

      setDropdownOpen((prev) => ({ ...prev, [orderId]: false }));

      // Update the order in the local state so UI reflects the change
      // If you use Redux Toolkit and the slice updates state, this may not be needed,
      // but if not, update the order manually:
      // (Uncomment and adjust if needed, otherwise rely on Redux state update)
      // setOrders((prevOrders) =>
      //   prevOrders.map((order) =>
      //     order._id === orderId ? { ...order, status: newStatus } : order
      //   )
      // );

      // If your redux slice does not update state, you can dispatch fetchAllOrders here:
      dispatch(fetchAllOrders({ token: adminToken }));
    } catch (err) {
      toast.error("Failed to update order status", {
        description: err.message || "Please try again",
      });
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await dispatch(deleteAdminOrder({ id: orderId, token: adminToken })).unwrap();
      toast.success("Order deleted successfully", {
        description: `Order ${orderId} has been removed`,
      });
    } catch (err) {
      toast.error("Failed to delete order", {
        description: err.message || "Please try again",
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-500 text-white";
      case "processing":
        return "bg-blue-500 text-white";
      case "shipped":
        return "bg-purple-500 text-white";
      case "delivered":
        return "bg-green-500 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  if (loading)
    return (
      <div className="mt-12 lg:mt-0 flex items-center justify-center h-64">
        <Package className="mx-auto h-12 w-12 text-gray-400 animate-pulse" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Loading orders...</h3>
      </div>
    );

  if (error)
    return (
      <div className="mt-12 lg:mt-0 bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Orders</h3>
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => dispatch(fetchAllOrders({ token: adminToken }))}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );

  return (
    <div className="mt-12 lg:mt-0 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-800">Order Management</h1>
        <p className="text-gray-600 mt-2">Manage customer orders and their status</p>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{orders?.length || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Processing</h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {orders?.filter((o) => o.status?.toLowerCase() === "processing").length || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Delivered</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {orders?.filter((o) => o.status?.toLowerCase() === "delivered").length || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {formatCurrency(orders?.reduce((sum, o) => sum + (o.totalPrice || 0), 0) || 0)}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-slate-800">Recent Orders</h2>
        </div>

        <div className="overflow-x-auto relative" style={{ maxHeight: "900px", minHeight: "500px", overflowY: "auto" }}>
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">#{order._id?.slice(-6)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {
                        typeof order.user === "object"
                          ? (order.user?.name || order.user?.email || order.user?._id || "Unknown")
                          : (order.user || "Unknown")
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(order.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{formatCurrency(order.totalPrice)}</td>
                    <td className="px-6 py-4 whitespace-nowrap relative">
                      <button
                        onClick={() => setDropdownOpen(prev => ({ ...prev, [order._id]: !prev[order._id] }))}
                        className={`inline-flex items-center px-3 py-2 rounded-md text-xs font-medium ${getStatusColor(order.status)} relative z-20`}
                      >
                        {order.status || "Pending"}
                        <ChevronDown className="w-3 h-3 ml-1" />
                      </button>

                      {dropdownOpen[order._id] && (
                        <div className="absolute top-full left-0 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-xl z-50">
                          {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                            <button
                              key={status}
                              onClick={() => handleUpdateStatus(order._id, status)}
                              className="block w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-blue-100 cursor-pointer"
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button onClick={() => setSelectedOrder(order)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium inline-flex items-center">
                        <Eye className="w-4 h-4 mr-1" /> View
                      </button>
                      <button onClick={() => handleDeleteOrder(order._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium inline-flex items-center">
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium">No orders found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Click outside to close dropdown */}
        {Object.values(dropdownOpen).some(Boolean) && <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen({})} style={{ background: "transparent" }} />}
      </div>

      {/* Modal */}
      {/* Modal */}
{selectedOrder && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-xl shadow-xl w-11/12 md:w-2/3 lg:w-1/2 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h2 className="text-xl font-semibold text-slate-800">Order Details</h2>
        <button
          onClick={() => setSelectedOrder(null)}
          className="text-gray-500 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        
        {/* Order Info */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Order Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-mono text-gray-900">{selectedOrder._id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="font-medium text-gray-900">
                {typeof selectedOrder.user === "object"
                  ? (selectedOrder.user?.name || selectedOrder.user?.email || selectedOrder.user?._id || "Unknown")
                  : (selectedOrder.user || "Unknown")}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium text-gray-900">{formatDate(selectedOrder.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                {selectedOrder.status}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Payment</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Method</p>
              <p className="font-medium text-gray-900">{selectedOrder.paymentMethod}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <p className={`font-medium ${selectedOrder.isPaid ? "text-green-600" : "text-red-600"}`}>
                {selectedOrder.paymentStatus || (selectedOrder.isPaid ? "Paid" : "Unpaid")}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Total Price</p>
              <p className="font-semibold text-gray-900 text-lg">{formatCurrency(selectedOrder.totalPrice)}</p>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Delivery</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Delivered</p>
              <p className={`font-medium ${selectedOrder.isDelivered ? "text-green-600" : "text-yellow-600"}`}>
                {selectedOrder.isDelivered ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium text-gray-900">
                {selectedOrder.shippingAddress
                  ? `${selectedOrder.shippingAddress.address}, ${selectedOrder.shippingAddress.city}, ${selectedOrder.shippingAddress.country}`
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default OrderManagement;
