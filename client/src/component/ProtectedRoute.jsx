import React, { Children } from 'react'
import { userAuth } from '../AuthStore/AuthStore'
import { Navigate } from 'react-router';
import {loadingClass} from '../styles/Common.js'
function ProtectedRoute({children,role}) {
    let isAuthenticated = userAuth(state => state.isAuthenticated);
    let currentUser = userAuth(state => state.currentUser);
    let loading = userAuth(state => state.loading);

    if(loading){
        return <p className={loadingClass}>Loading...</p>
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace></Navigate>
    }
    // check Current User Role
    if(role && currentUser.role != role){
        return <Navigate to="/register" replace></Navigate>
    }
  return children
}

export default ProtectedRoute