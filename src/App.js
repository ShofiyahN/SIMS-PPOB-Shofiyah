import React, { useEffect, useState } from 'react'
import './App.css';
import AuthRouter from './router/AuthRouter';
import HomeRouter from './router/HomeRouter';
import apiClient from './services/Api';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { login, logout, updateBalance, updateUser } from './features/authSlice';
import { useNavigate } from 'react-router';
import { Spinner, Stack } from '@chakra-ui/react';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  const getUser = async () => {
    if (!isLoading) return
    try {
      const user = await apiClient.get('/profile')
      dispatch(login())
      dispatch(updateUser({
        user_email: user?.data?.data?.email,
        user_first_name: user?.data?.data?.first_name,
        user_last_name: user?.data?.data?.last_name,
        user_image: user?.data?.data?.profile_image,
      }))
      getBalance()
    } catch (error) {
      dispatch(logout())
      localStorage.removeItem('sims-token')
    } finally {
      setIsLoading(false)
    }
  }

  const getBalance = async () => {
    try {
      const balance = await apiClient.get('/balance')
      if (balance) {
        dispatch(updateBalance({
          balance: balance?.data?.data.balance
        }))
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getUser()
  }, [])
  
  if (isLoading) {
    return <Stack h={'100vh'} alignItems={'center'} justify={'center'}><Spinner size={'lg'}/></Stack>
  }

  return (
    <div>
      {isLoggedIn ? 
        <HomeRouter />
        :
        <AuthRouter />
      }
    </div>
  );
}

export default App;
