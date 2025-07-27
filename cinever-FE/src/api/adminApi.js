import api from "./index";

export const getAdminReviewerList = async () => {
  try {
    const res = await api.get("/reviewer/all/admin");
    return res.data;
  } catch (err) {
    console.error("관리자 리뷰어 목록 조회 실패:", err);
    throw err;
  }
};

export const getSingleAdminReviewer = async () => {
  try {
    const res = await api.get("/reviewer/single/admin");
    return res.data;
  } catch (err) {
    console.error("단일 관리자 리뷰어 조회 실패:", err);
    throw err;
  }
};

export const getAdminReviewList = async (searchType = "", content = "") => {
  try {
    const res = await api.get("/review/admin", {
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
    const res = await api.patch(`/reviewer/block/${memberId}`, {
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
    const res = await api.patch(`/reviewer/unblock/${memberId}`, {
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
    const res = await api.patch(`/reviewer/block/multi`, { reviewerList });
    return res.data;
  } catch (err) {
    console.error("다중 리뷰어 차단 실패:", err);
    throw err;
  }
};

export const unblockMultiReviewers = async (reviewerList) => {
  try {
    const res = await api.patch(`/reviewer/unblock/multi`, {
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
    const res = await api.patch(`/reviewer/role/${memberId}`, { role });
    return res.data;
  } catch (err) {
    console.error("리뷰어 역할 변경 실패:", err);
    throw err;
  }
};

export const updateMultiReviewerRole = async (reviewerList) => {
  try {
    const res = await api.patch(`/reviewer/role/multi`, { reviewerList });
    return res.data;
  } catch (err) {
    console.error("다중 리뷰어 역할 변경 실패:", err);
    throw err;
  }
};

export const blockReview = async (reviewId, isBanned) => {
  try {
    const res = await api.patch(`/review/block/${reviewId}`, {
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
    const res = await api.patch(`/review/unblock/${reviewId}`, {
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
    const res = await api.patch(`/review/block/multi`, { reviewList });
    return res.data;
  } catch (err) {
    console.error("다중 리뷰 차단 실패:", err);
    throw err;
  }
};

export const unblockMultiReviews = async (reviewList) => {
  try {
    const res = await api.patch(`/review/unblock/multi`, { reviewList });
    return res.data;
  } catch (err) {
    console.error("다중 리뷰 차단 해제 실패:", err);
    throw err;
  }
};

export const getWithdrawalCnt = async (dateType) => {
  try {
    const res = await api.get(`/member/admin/stats/withdrawal/${dateType}`);
    return res.data;
  } catch (err) {
    console.error("탈퇴자 추세 API 호출 실패");
    throw err;
  }
};

export const getTotalMember = async () => {
  try {
    const res = await api.get("/member/admin/stats/total");
    return res.data;
  } catch (err) {
    console.error("총 멤버 수 API 호출 실패");
    throw err;
  }
};

export const getRegisterCnt = async (dateType) => {
  try {
    const res = await api.get(`/member/admin/stats/register/${dateType}`);
    return res.data;
  } catch (err) {
    console.error("가입자 추세 API 호출 실패");
    throw err;
  }
};

export const getReviewTrendCnt = async (dateType) => {
  try {
    const res = await api.get(`/review/admin/stats/trend?dateType=${dateType}`);
    return res.data;
  } catch (err) {
    console.error("리뷰 추세 API 호출 실패");
    throw err;
  }
};

export const getTotalReviewCnt = async (dateType) => {
  try {
    const res = await api.get("/review/admin/stats/total");
    return res.data;
  } catch (err) {
    console.error("총 리뷰 수 API 호출 실패");
    throw err;
  }
};
