import {BrowserRouter, Route, Routes} from "react-router-dom"

import Checkout from "./components/Cart/Checkout";
import CollectionPage from "./pages/CollectionPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OderConfirmationPage from "./pages/OderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailspage";
import ProductDetails from "./components/Products/ProductDetails";
import Profile from "./pages/Profile";
import React from "react";
import Register from "./pages/Register";
import {Toaster} from "sonner"
import UserLayout from './components/Layout/UserLayout';

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
</Route>
      <Route>{/*Admin Layout*/}</Route>
    </Routes>
</BrowserRouter>
  );
};

export default App
