import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../Common/Footer";
import Header from "../Common/Header";
import { Outlet } from "react-router-dom";
import { fetchCart } from "../../redux/slices/cartSlice";

const UserLayout = () => {
  const dispatch = useDispatch();
  const { user, guestId } = useSelector((state) => state.auth);
  
  // Initialize cart when the app loads
  useEffect(() => {
    const userId = user?._id;
    dispatch(fetchCart({ userId, guestId }));
  }, [dispatch, user, guestId]);

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
