import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    setLoadingPage: (state) => {
      return true
    },
    setStopLoading: (state) => {
      return false
    },
  }
});

export const { setLoadingPage, setStopLoading} = loadingSlice.actions;
export default loadingSlice.reducer;