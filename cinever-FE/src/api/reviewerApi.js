import api from "./index";

const reviewerApi = "/reviewer";

export const getReviewerAll = async (page = 0) => {
  try {
    const response = await api.get(`${reviewerApi}/all?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

export const getReviewerDetail = async (id) => {
  try {
    const response = await api.get(`${reviewerApi}/${id}`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};
