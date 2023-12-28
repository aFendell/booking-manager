import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;

const axiosClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
