import {BrowserRouter, Route, Routes} from "react-router-dom"

import AdminLayout from "./components/Admin/AdminLayout";
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
import React from "react";
import Register from "./pages/Register";
import {Toaster} from "sonner"
import UserLayout from './components/Layout/UserLayout';
import UserManagement from "./components/Admin/UserManagement";

const App= () => {
  
  return (
<BrowserRouter>
<Toaster position="top-right"/>
    <Routes>
       {/*User Layout*/}
        <Route path="/" element={<UserLayout/>}> 
        <Route index element={<Home/>}/>
       <Route path="login" element={<Login/>}/>
       <Route path="register" element={<Register/>}/>
       <Route path="profile" element={<Profile/>}/>
        <Route path="collections/:collection" element={<CollectionPage/>}/>
        <Route path="product/:id" element={<ProductDetails/>}/>
        <Route path="checkout" element={<Checkout/>}/>
        <Route path="order-confirmation" element={<OderConfirmationPage/>}/>
        <Route path="order/:id" element={<OrderDetailsPage/>}/>
        <Route path="my-orders" element={<MyOrdersPage/>}/>
</Route>
 {/* Admin Layout Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Dashboard is handled internally by AdminLayout */}
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
        </Route>
      </Routes>
</BrowserRouter>
  );
};

export default App
