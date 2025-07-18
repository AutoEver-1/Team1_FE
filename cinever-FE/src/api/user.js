import api from "./index";

const userApi = "/api/user";

export const getUserInfo = async (id) => {
  try {
    const response = await api.get(`${userApi}/${id}`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

export const getUserWishlistInfo = async (id) => {
  try {
    const response = await api.get(`${userApi}/${id}/wishlist`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

export const getUserRecentInfo = async (id) => {
  try {
    const response = await api.get(`${userApi}/${id}/recent-movie`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

export const getUserFavoriteInfo = async (id) => {
  try {
    const response = await api.get(`${userApi}/${id}/favorite-movie`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

export const getUserDislikeInfo = async (id) => {
  try {
    const response = await api.get(`${userApi}/${id}/dislike-movie`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

export const getUserReviewsInfo = async (id) => {
  try {
    const response = await api.get(`${userApi}/${id}/reviews`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};
