import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function ProtectedRoutes({children}) {
    const {token}=useSelector((state)=>state.auth);

    const finalToken=token ||localStorage.getItem("token");
    console.log(finalToken);
    
    if(!finalToken){
  return <Navigate to="/login" replace />
    }
  return children;
}

export default ProtectedRoutes;