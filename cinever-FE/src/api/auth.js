import api from "./index";

const authApi = "/api";

export const signup = async (formData) => {
  try {
    const response = await api.post(`${authApi}/signup`, {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      gender: formData.gender,
      birth_date: formData.birth,
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};
