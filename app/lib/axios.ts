import axios from "axios";

const axiosInstance = axios.create({
  baseURL:'https://beegee-backend-1.onrender.com/api',
//   timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;