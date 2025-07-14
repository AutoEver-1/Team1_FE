import api from "./index";

const movieApi = "/api/movie";

export const getFamous = async () => {
  try {
    const response = await api.get(`${movieApi}/famous`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

export const getOttExpect = async (ottId) => {
  try {
    const response = await api.get(`${movieApi}/ott/${ottId}/expect/release`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

export const getOttRecently = async (ottId) => {
  try {
    const response = await api.get(`${movieApi}/ott/${ottId}/recently/release`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

export const getMovieDetail = async (movieId) => {
  try {
    const response = await api.get(`${movieApi}/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};
