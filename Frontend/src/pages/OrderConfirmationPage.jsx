import React, { useEffect } from "react";
import { clearCart, clearCartServer } from "../redux/slices/cartSlice"; // <-- add this
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// import your getOrderDetails action
// import { getOrderDetails } from "../redux/actions/orderActions"; // adjust path as needed

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use fallback object to avoid crash if state.order is undefined
  const orderState = useSelector((state) => state.order || {});
  const orderDetails = orderState.order;
  const loading = orderState.loading;
  const error = orderState.error;
  const { user, guestId } = useSelector((state) => state.auth); // <-- add this

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

  const handleGoToProfile = () => {
    const userId = user ? user._id : null;
    dispatch(clearCartServer({ userId, guestId }));
    dispatch(clearCart());
    navigate("/profile"); // or "/my-orders" if that's your profile/orders page
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You for Your Order!
      </h1>
      {/* Add Go to Home and See My Orders buttons at the bottom */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={handleGoHome}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow transition-colors"
        >
          Go to Home Page
        </button>
        <button
          onClick={handleGoToProfile}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-colors"
        >
          See My Orders
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
