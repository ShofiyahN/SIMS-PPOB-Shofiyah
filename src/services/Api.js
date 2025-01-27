import axios from 'axios';

const getToken = () => localStorage.getItem('sims-token') || ''

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMsg = error?.response?.data?.message || 
      error?.response?.data?.error || 
      error?.message || 
      'Something went wrong';
    const status = error?.response?.data?.status || '400'
    return Promise.reject({ message: errorMsg, status: status })
  }
);

export default apiClient;