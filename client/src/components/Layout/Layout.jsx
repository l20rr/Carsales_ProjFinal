import React, { Fragment } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import { useLocation } from 'react-router-dom';
import AppregisterPC from "./AppregisterPC";
const Layout = () => {
  const hideLayout = window.location.pathname === "/register";

  const location = useLocation();



  return (
    <Fragment>
      {location.pathname === '/register' ? (
       <AppregisterPC/>
      ) : (
        <Header />
      )}
      <div>
        <Routers />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;