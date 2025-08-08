import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminLayout from "./components/Admin/AdminLayout";
import { AuthProvider } from "./context/AuthContext";
import Checkout from "./components/Cart/Checkout";
import CollectionPage from "./pages/CollectionPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyOrdersPage from "./pages/MyOrdersPage";
import OderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailspage";
import OrderManagement from "./components/Admin/OrderMangement";
import ProductDetails from "./components/Products/ProductDetails";
import ProductManagement from "./components/Admin/ProductManagement";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import {Provider} from "react-redux";
import React from "react";
import Register from "./pages/Register";
import { Toaster } from "sonner";
import UserLayout from "./components/Layout/UserLayout";
import UserManagement from "./components/Admin/UserManagement";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
        {/*User Layout*/}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="collections/:collection" element={<CollectionPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="order-confirmation" element={<ProtectedRoute><OderConfirmationPage /></ProtectedRoute>} />
          <Route path="order/:id" element={<ProtectedRoute><OrderDetailsPage /></ProtectedRoute>} />
          <Route path="my-orders" element={<ProtectedRoute><MyOrdersPage /></ProtectedRoute>} />
        </Route>
        {/* Admin Layout Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Dashboard is handled internally by AdminLayout */}
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
        </Route>        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
