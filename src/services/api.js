import axios from "axios";
import { authHeader } from "./AuthService";

const API = axios.create({
  baseURL: "http://localhost:8082/api",
});

// Attach token automatically
API.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    ...authHeader(),
  };
  return config;
});

export default API;
