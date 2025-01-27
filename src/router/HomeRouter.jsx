/* eslint-disable indent */
import React from 'react';
import { Route, Routes } from 'react-router';
import Layout from '../layout';
import AccountPage from '../pages/account/AccountPage';
import HomePage from '../pages/home/HomePage';
import TopUpPage from '../pages/top-up/TopUpPage';
import TransactionHistory from '../pages/transaction/TransactionHistory';
import TransactionPage from '../pages/transaction/TransactionPage';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RedirectPage from '../pages/authentication/RedirectPage';

export default function HomeRouter() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const homeRouterData = [
    {
      path: '/',
      element: <HomePage/>
    },
    {
      path: '/topup',
      element: <TopUpPage/>
    },
    {
      path: '/transaction/:slug',
      element: <TransactionPage/>
    },
    {
      path: '/transaction',
      element: <TransactionHistory/>
    },
    {
      path: '/account',
      element: <AccountPage/>
    },
    {
      path: '*',
      element: <RedirectPage/>
    },
    
  ]
  return (
    <Layout>
      <Routes>
        {homeRouterData?.map((x, index) => (
          <Route key={index} path={x.path} element={!isLoggedIn ? <Navigate to="/login" /> : x.element}/>
        ))}
      </Routes>
    </Layout>
    
  )
}


