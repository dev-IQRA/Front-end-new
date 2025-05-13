// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3333', // Sesuaikan jika backendmu beda
  withCredentials: true // penting untuk cookie login
});

export default axiosInstance;
