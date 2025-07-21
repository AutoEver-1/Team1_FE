export const roleClassMap = {
  USER: "bg-gradient-to-br from-yellow-300/30 via-yellow-700/20 to-black/50 border-yellow-400/20 hover:border-yellow-300 hover:shadow-[0_0_10px_rgba(255,215,0,0.3)]",
  CRITIC:
    "bg-gradient-to-br from-cyan-300/80 via-cyan-900/80 to-black/50 border-cyan-400/20 hover:border-cyan-300 hover:shadow-[0_0_10px_rgba(0,255,255)]",
  INFLUENCER:
    "bg-gradient-to-br from-red-700/90 via-red/80 to-black/90 border-red-400/20 shadow-[0_0_10px_rgba(255,0,0)] hover:border-red-300 hover:shadow-[0_0_15px_rgba(255,0,0)]",
};

export const badgeClassMap = {
  USER: "bg-yellow-400/30 text-yellow-100 border-yellow-200/10 shadow-yellow-100/20",
  CRITIC: "bg-cyan-400/40 text-cyan-100 border-cyan-200/20 shadow-cyan-100/20",
  INFLUENCER: "bg-red-600/40 text-red-100 border-red-200/20 shadow-red-100/20",
};

export const roleNameMap = {
  USER: "리뷰어",
  CRITIC: "비평가",
  INFLUENCER: "인플루언서",
};

// 선택적으로 하나로 묶어서 리턴하는 함수도 만들 수 있음
export const getReviewerRoleMeta = (role = "USER") => ({
  roleClass: roleClassMap[role] || roleClassMap.USER,
  badgeClass: badgeClassMap[role] || badgeClassMap.USER,
  roleName: roleNameMap[role] || "리뷰어",
});
