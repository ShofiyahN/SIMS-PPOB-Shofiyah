import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      email: null,
      first_name: null,
      last_name: null,
      image: null
    },
    balance: null,
    isLoggedIn: false
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    updateUser: (state, action) => {
      state.user = {
        email: action.payload.user_email,
        first_name: action.payload.user_first_name,
        last_name: action.payload.user_last_name,
        image: action.payload.user_image
      }
    },
    updateBalance: (state, action) => {
      state.balance = action.payload.balance;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {
        email: null,
        first_name: null,
        last_name: null,
        image: null
      };
      state.balance = null;
    }
  }
});

export const { login, logout, updateBalance, updateUser } = authSlice.actions;
export default authSlice.reducer;