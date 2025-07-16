import api from "./index";

export const getAdminReviewerList = async () => {
  try {
    const res = await api.get("/api/reviewer/all/admin");
    return res.data;
  } catch (err) {
    console.error("관리자 리뷰어 목록 조회 실패:", err);
    throw err;
  }
};

export const getSingleAdminReviewer = async () => {
  try {
    const res = await api.get("/api/reviewer/single/admin");
    return res.data;
  } catch (err) {
    console.error("단일 관리자 리뷰어 조회 실패:", err);
    throw err;
  }
};

export const getAdminReviewList = async (searchType = "", content = "") => {
  try {
    const res = await api.get("/api/review/admin", {
      params: { searchType, content },
    });
    return res.data;
  } catch (err) {
    console.error("관리자 리뷰 목록 조회 실패:", err);
    throw err;
  }
};

export const blockReviewer = async (memberId, isBanned) => {
  try {
    const res = await api.patch(`/api/reviewer/block/${memberId}`, {
      isBanned,
    });
    return res.data;
  } catch (err) {
    console.error("리뷰어 차단 실패:", err);
    throw err;
  }
};

export const unblockReviewer = async (memberId, isBanned) => {
  try {
    const res = await api.patch(`/api/reviewer/unblock/${memberId}`, {
      isBanned,
    });
    return res.data;
  } catch (err) {
    console.error("리뷰어 차단 해제 실패:", err);
    throw err;
  }
};

export const blockMultiReviewers = async (reviewerList) => {
  try {
    const res = await api.patch(`/api/reviewer/block/multi`, { reviewerList });
    return res.data;
  } catch (err) {
    console.error("다중 리뷰어 차단 실패:", err);
    throw err;
  }
};

export const unblockMultiReviewers = async (reviewerList) => {
  try {
    const res = await api.patch(`/api/reviewer/unblock/multi`, {
      reviewerList,
    });
    return res.data;
  } catch (err) {
    console.error("다중 리뷰어 차단 해제 실패:", err);
    throw err;
  }
};

export const updateReviewerRole = async (memberId, role) => {
  try {
    const res = await api.patch(`/api/reviewer/role/${memberId}`, { role });
    return res.data;
  } catch (err) {
    console.error("리뷰어 역할 변경 실패:", err);
    throw err;
  }
};

export const updateMultiReviewerRole = async (reviewerList) => {
  try {
    const res = await api.patch(`/api/reviewer/role/multi`, { reviewerList });
    return res.data;
  } catch (err) {
    console.error("다중 리뷰어 역할 변경 실패:", err);
    throw err;
  }
};

export const blockReview = async (reviewId, isBanned) => {
  try {
    const res = await api.patch(`/api/review/block/${reviewId}`, {
      isBanned,
    });
    return res.data;
  } catch (err) {
    console.error("리뷰 차단 실패:", err);
    throw err;
  }
};

export const unblockReview = async (reviewId, isBanned) => {
  try {
    const res = await api.patch(`/api/review/unblock/${reviewId}`, {
      isBanned,
    });
    return res.data;
  } catch (err) {
    console.error("리뷰 차단 해제 실패:", err);
    throw err;
  }
};

export const blockMultiReviews = async (reviewList) => {
  try {
    const res = await api.patch(`/api/review/block/multi`, { reviewList });
    return res.data;
  } catch (err) {
    console.error("다중 리뷰 차단 실패:", err);
    throw err;
  }
};

export const unblockMultiReviews = async (reviewList) => {
  try {
    const res = await api.patch(`/api/review/unblock/multi`, { reviewList });
    return res.data;
  } catch (err) {
    console.error("다중 리뷰 차단 해제 실패:", err);
    throw err;
  }
};
