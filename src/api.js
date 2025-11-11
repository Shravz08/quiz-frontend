import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8082/api",
});

export default API;
