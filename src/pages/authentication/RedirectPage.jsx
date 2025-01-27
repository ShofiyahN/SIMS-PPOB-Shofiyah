import React from 'react'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux';

const RedirectPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn) {
    return <Navigate to='/'/>
  }
  return <Navigate to='/login'/>
}

export default RedirectPage
