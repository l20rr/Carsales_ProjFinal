import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";

import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import ChatApi from "../pages/ChatApi";
import PrivateRoute from "../services/PrivateRoute";
import RegisterCat from "../pages/RegisterCategory";
import RegisterInvoice from "../pages/RegisterInvoice"
import RegisterSub from "../pages/RegisterSub";
import Registeradverts from "../pages/Registeradverts";
import RegisterVhicle from "../pages/RegisterVhicle";
import Register from "../components/Header/Register";

import UserProfile from "../Admin/UserProfile"
import AdminUsers from "../pages/AdminUsers";

import Dash from "../Admin/Dash";
import Invoice from "../Admin/Invoice";
import Anuncios from "../pages/Anuncios";
import {useState, useEffect } from 'react';
import api from '../services/api'
import Cookies from "universal-cookie";
import { AuthContext } from '../components/AuthContext'


const Routers = () => {
  return (
    <Routes>
      <Route path="/AdminUsers" element={<AdminUsers />} />
      <Route path="/anuncios" element={<Anuncios/>} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:ID" element={<CarDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={<ChatApi />} />
      <Route path="/Admin" element={<Dash />} />
      <Route path="/UserProfile" element={<UserProfile />} /> 
      <Route path="cars/registerCategory" element={
        <PrivateRoute redirectTo="register">
          <RegisterCat/> 
        </PrivateRoute>
    }/>
  <Route path="cars/registerCategory/RegisterSub/:IDCategory" element={<RegisterSub />} />
     <Route path="cars/registerCategory/RegisterSub/registerVhicle/:subcategoryID" element={
        <PrivateRoute redirectTo="register">
          <RegisterVhicle/> 
        </PrivateRoute>
    }/>
       <Route path="/Registeradverts/:vehicleID" element={<Registeradverts />} />
       <Route path="/:publishadID/:purchaseID/RegisterInvoice" element={<RegisterInvoice />} />
       <Route path="/Invoice" element={<Invoice />} />
    </Routes>
  );
};

export default Routers;
