import Cookies from 'universal-cookie';
import React, { useEffect, useState } from 'react';

import { Route, Redirect, Navigate } from 'react-router-dom';
const cookies = new Cookies();

export default function PrivateRoute ({ children, redirectTo }){

    
    const isAutenticated = cookies.get("token") !== null;
    console.log("isAuth: ", isAutenticated)

  
    return isAutenticated ? children : <Navigate to={redirectTo} />
}