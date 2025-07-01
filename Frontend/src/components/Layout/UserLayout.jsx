import Footer from "../Common/Footer";
import Header from "../Common/Header";
import { Outlet } from "react-router-dom";
import React from "react";

const UserLayout = () => {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default UserLayout;
