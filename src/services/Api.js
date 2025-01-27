import axios from 'axios';

const getToken = () => localStorage.getItem('sims-token') || ''

const apiClient = axios.create({
  baseURL: 'https://take-home-test-api.nutech-integrasi.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RpbmctOTk5QG1haWwuY29tIiwibWVtYmVyQ29kZSI6Ik02QVpVQTJOIiwiaWF0IjoxNzM3OTExMzM4LCJleHAiOjE3Mzc5NTQ1Mzh9.R5it3ucGngbIhExiIOsuDXQGBDNiSwGxXolXYNHJF2s'
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
    console.log(error,'sos')
    const errorMsg = error?.response?.data?.message || 
      error?.response?.data?.error || 
      error?.message || 
      'Something went wrong';
    const status = error?.response?.data?.status || '400'
    return Promise.reject({ message: errorMsg, status: status })
  }
);

export default apiClient;