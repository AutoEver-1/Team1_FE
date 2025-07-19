import axios from "axios";

const api = axios.create({
  // baseURL: "http://54.180.144.181:8080",
  // baseURL: "http://localhost:8080",
  baseURL: "http://cinever.store",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
