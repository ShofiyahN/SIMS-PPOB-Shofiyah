import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '../features/authSlice';
import serviceSlice from '../features/serviceSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  services: serviceSlice,
});

export default rootReducer;