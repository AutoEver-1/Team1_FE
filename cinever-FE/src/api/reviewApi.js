import api from "./index";

const movieApi = "/api/review";

export const getReview = async (movieId) => {
  try {
    const response = await api.get(`${movieApi}/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};
