import {BrowserRouter, Route, Routes} from "react-router-dom"

import Home from "./pages/Home";
import React from "react";
import UserLayout from './components/Layout/UserLayout';

const App= () => {
  
  return (
<BrowserRouter>
    <Routes>
        <Route path="/" element={<UserLayout/>}> 
        <Route index element={<Home/>}/> </Route>
        {/*User Layout*/}
      <Route>{/*Admin Layout*/}</Route>
    </Routes>
</BrowserRouter>
  );
};

export default App
