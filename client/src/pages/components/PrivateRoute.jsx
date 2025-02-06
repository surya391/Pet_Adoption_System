import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'

const PrivateRoute = (props) =>{
    const { userInfo, isLoggedIn } = useSelector(state => state.auth)
    console.log("userInfo",userInfo)
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        if(!localStorage.getItem("token")){
            return navigate('/login',{ state: { from : location }})
        }
    }, [ navigate, location ]);
    if(isLoggedIn && props.permittedRoles && props.permittedRoles.includes( userInfo.role )){
        return props.children
    }else if( isLoggedIn && props.permittedRoles && !props.permittedRoles.includes(userInfo.role)){
        return  <div className="flex flex-grow items-center justify-center bg-gray-100">
        <p className="text-red-600 font-bold text-2xl bg-red-100 p-4 rounded-md shadow-md">
          Unauthorized Access!
        </p>
      </div>
      
      
    }else if ( isLoggedIn && !props.permittedRoles){
        return props.children
    }else{
        return <Navigate to='/login' replace/>
    }
}

export default PrivateRoute