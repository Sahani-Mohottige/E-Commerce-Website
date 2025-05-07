import NavBar from './NavBar';
import React from 'react';
import TopBar from '../Layout/TopBar'

const Header = () => {
  return (
 <>
    <header> {/*Topbar*/}
       <TopBar/>
   {/*Nav bar*/}
   <NavBar/>
   {/*Cart drawer*/}
   </header>
 </>

  );
};

export default Header