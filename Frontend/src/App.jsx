import {BrowserRouter, Route, Routes} from "react-router-dom"

import React from "react";
import UserLayout from './components/Layout/UserLayout';

const App= () => {
  
  return (
<BrowserRouter>
    <Routes>
        <Route path="/" element={<UserLayout/>}> 
        {/*User Layout*/}</Route>
      <Route>{/*Admin Layout*/}</Route>
    </Routes>
</BrowserRouter>
  );
};

export default App
