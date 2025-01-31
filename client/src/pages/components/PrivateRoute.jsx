import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'

const PrivateRoute = (props) =>{
    const { userInfo, isLoggedIn } = useSelector(state => state.auth)
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
        return <p>Unauthorized Access!</p>
    }else if ( isLoggedIn && !props.permittedRoles){
        return props.children
    }else{
        return <Navigate to='/login' replace/>
    }
}

export default PrivateRoute