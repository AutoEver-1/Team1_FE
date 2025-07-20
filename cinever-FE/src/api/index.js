import axios from "axios";
import { useUserStore } from "../stores/userStore";

const api = axios.create({
  baseURL: "http://cinever.store/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
