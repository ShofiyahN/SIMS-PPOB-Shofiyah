import React, { useEffect, useState } from 'react'
import './App.css';
import AuthRouter from './router/AuthRouter';
import HomeRouter from './router/HomeRouter';
import apiClient from './services/Api';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { login, logout, updateBalance, updateUser } from './features/authSlice';
import { useNavigate } from 'react-router';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  console.log(isLoggedIn,'login ga')

  const getUser = async () => {
    if (!isLoading) return
    try {
      const user = await apiClient.get('/profile')
      console.log('ini data user :', user)
      dispatch(login())
      dispatch(updateUser({
        user_email: user?.data?.data?.email,
        user_first_name: user?.data?.data?.first_name,
        user_last_name: user?.data?.data?.last_name,
        user_image: user?.data?.data?.profile_image,
      }))
      console.log('user set done ...')
      getBalance()
    } catch (error) {
      dispatch(logout())
      localStorage.removeItem('sims-token')
      console.log(error.message)
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
      console.log('ini balance :', balance)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getUser()
  }, [])
  
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
