import axios from "axios";

var baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL
});

// Interceptor para añadir el token a cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token"); // o sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
