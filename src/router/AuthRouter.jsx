/* eslint-disable indent */
import React from 'react';
import { Route, Routes } from 'react-router';
import LoginPage from '../pages/authentication/LoginPage';
import RedirectPage from '../pages/authentication/RedirectPage';
import RegistrationPage from '../pages/authentication/RegistrationPage';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function AuthRouter() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const authenticationRouter = [
  {
    path: '*',
    element: <RedirectPage/>
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/signup',
    element: <RegistrationPage/>
  }
  ]

  return (
    <Routes>
      {authenticationRouter?.map((x, index) => (
        <Route key={index} path={x.path} element={isLoggedIn ? <Navigate to="/" /> : x.element} />
    ))}
    </Routes>
  )
  
}





