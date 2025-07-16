import api from "./index";

export const getAdminReviewer = async (movieId) => {
  try {
    const response = await api.get(`/api/reviewer/all/admin`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

export const getAdminReview = async (movieId) => {
  try {
    const response = await api.get(`/api/review/admin`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};
