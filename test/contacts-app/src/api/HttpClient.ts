import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001",
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
