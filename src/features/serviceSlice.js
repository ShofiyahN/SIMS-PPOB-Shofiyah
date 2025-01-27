import { createSlice } from '@reduxjs/toolkit';

const serviceSlice = createSlice({
  name: 'services',
  initialState: {
    service_code: null,
    service_name: null,
    service_tariff: null
  },
  reducers: {
    setServices: (state, action) => {
      state.service_code = action.payload.service_code
      state.service_name = action.payload.service_name
      state.service_tariff = action.payload.service_tariff
      state.service_icon = action.payload.service_icon
    },
    clearService: (state) => {
      state.service_code = null
      state.service_name = null
      state.service_tariff = null
      state.service_icon = null
    },
  }
});

export const { setServices, clearService } = serviceSlice.actions;
export default serviceSlice.reducer;