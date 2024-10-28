import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
});

export default axiosInstance;
