import { formatDate } from "../services/formatDate";
import api from "./index";

const authApi = "/api";

export const signup = async (formData) => {
  try {
    const response = await api.post(`${authApi}/signup`, {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      gender: formData.gender,
      birth_date: formatDate(formData.birthday),
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

export const login = async (formData) => {
  try {
    const response = await api.post(`${authApi}/login`, {
      email: formData.email,
      password: formData.password,
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};
