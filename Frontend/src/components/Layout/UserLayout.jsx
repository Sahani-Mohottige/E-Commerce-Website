import Footer from '../Common/Footer';
import Header from '../Common/Header'
import NavBar from '../Common/NavBar';
import { Outlet } from 'react-router-dom';
import React from 'react'

const UserLayout = () => {
  return (
   <>
   {/*Header*/}
   <Header/>
   {/*Main content*/}
   <NavBar/>  
   <main>
       <Outlet /> {/* This is essential to render nested routes */}
     </main>
   {/*Footer*/}
   <Footer/>
   </>
  );
};

export default UserLayout
