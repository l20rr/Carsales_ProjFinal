import React, { Fragment } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import { useLocation } from 'react-router-dom';
import AppregisterPC from "./AppregisterPC";
const Layout = () => {
 

  const location = useLocation();



  return (
    <Fragment>
      {location.pathname === '/RegisterBO' ? (
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