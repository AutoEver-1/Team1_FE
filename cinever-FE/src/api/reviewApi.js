import api from "./index";

const reviewApi = "/api/review";

// ✅ 영화 리뷰 가져오기
export const getReview = async (movieId) => {
  try {
    const response = await api.get(`${reviewApi}/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

// ✅ 리뷰 작성
export const createReview = async (movieId, payload) => {
  try {
    const response = await api.post(`${reviewApi}/movie/${movieId}`, payload);
    return response.data;
  } catch (error) {
    console.error("리뷰 작성 실패:", error);
    throw error;
  }
};

// ✅ 리뷰 수정
export const updateReview = async (movieId, payload) => {
  try {
    const response = await api.patch(`${reviewApi}/movie/${movieId}`, payload);
    return response.data;
  } catch (error) {
    console.error("리뷰 수정 실패:", error);
    throw error;
  }
};

// ✅ 리뷰 삭제
export const deleteReview = async (reviewId) => {
  try {
    const response = await api.delete(`${reviewApi}/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error("리뷰 삭제 실패:", error);
    throw error;
  }
};

// ✅ 리뷰 좋아요
export const likeReview = async (reviewId) => {
  try {
    const response = await api.post(`${reviewApi}/${reviewId}/like`);
    return response.data;
  } catch (error) {
    console.error("리뷰 좋아요 실패:", error);
    throw error;
  }
};

// ✅ 리뷰 좋아요 취소
export const unlikeReview = async (reviewId) => {
  try {
    const response = await api.delete(`${reviewApi}/${reviewId}/like`);
    return response.data;
  } catch (error) {
    console.error("리뷰 좋아요 취소 실패:", error);
    throw error;
  }
};

export const getFollowingReview = async () => {
  try {
    const response = await api.get(`${reviewApi}/following/reviews`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};
