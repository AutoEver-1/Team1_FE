import axios from "axios";

const api = axios.create({
  baseURL: "http://54.180.144.181:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
