import {BrowserRouter, Route, Routes} from "react-router-dom"

import Home from "./pages/Home";
import Login from "./pages/Login";
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
       </Route>
      <Route>{/*Admin Layout*/}</Route>
    </Routes>
</BrowserRouter>
  );
};

export default App
