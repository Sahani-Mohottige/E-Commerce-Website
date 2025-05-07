import Footer from '../Common/Footer';
import {Header} from '../Common/Header'
import NavBar from '../Common/NavBar';
import { Outlet } from 'react-router-dom';
import React from 'react'

const UserLayout = () => {
  return (
   <>
   {/*Header*/}<header><Header/>
   <NavBar/>  </header>
   {/*Footer*/}
   <Footer/>
   </>
  );
};

export default UserLayout
