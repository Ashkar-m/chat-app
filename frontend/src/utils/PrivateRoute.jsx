import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children , ...rest}) => {
    let {user} = useContext(AuthContext)
    return (
    <>
        { !user ? <Navigate to='/login' /> : children }
    </>
  )
}

export default PrivateRoute;
