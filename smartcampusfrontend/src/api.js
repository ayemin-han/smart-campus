import axios from 'axios';

const api = axios.create({
  baseURL: 'https://smart-campus-10.onrender.com/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
