export const roleClassMap = {
  USER: "bg-gradient-to-br from-yellow-300/20 via-yellow-100/10 to-yellow-300/0 border-yellow-400/20 hover:border-yellow-300 hover:shadow-[0_0_10px_rgba(255,215,0,0.3)]",
  CRITIC:
    "bg-gray-900/60 bg-gradient-to-br from-cyan-300/60 via-cyan-500/20 to-cyan-400/0 border-cyan-400/20 shadow-[0_0_5px_rgba(0,255,255,0.3)] hover:border-cyan-300 hover:shadow-[0_0_10px_rgba(0,255,255,0.3)]",
  INFLUENCER:
    "bg-gradient-to-br from-red-700/90 via-red-500/20 to-red-500/0 border-red-400/20 shadow-[0_0_10px_rgba(255,0,0,0.3)] hover:border-red-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.3)]",
  ADMIN:
    "bg-gray-900/60 bg-gradient-to-br from-purple-600/70 via-purple-400/20 to-purple-500/0 border-purple-300/20 shadow-[0_0_10px_rgba(128,90,213,0.3)] hover:border-purple-300 hover:shadow-[0_0_15px_rgba(128,90,213,0.4)]",
};

export const badgeClassMap = {
  USER: "bg-yellow-400/30 text-yellow-100 border-yellow-200/10 shadow-yellow-100/20",
  CRITIC: "bg-cyan-400/40 text-cyan-100 border-cyan-200/20 shadow-cyan-100/20",
  INFLUENCER: "bg-red-600/80 text-red-100 border-red-200/20 shadow-red-100/20",
  ADMIN:
    "bg-purple-700/80 text-purple-100 border-purple-300/20 shadow-purple-100/20",
};

export const roleNameMap = {
  USER: "리뷰어",
  CRITIC: "비평가",
  INFLUENCER: "인플루언서",
  ADMIN: "관리자",
};

export const getReviewerRoleMeta = (role = "USER") => ({
  roleClass: roleClassMap[role] || roleClassMap.USER,
  badgeClass: badgeClassMap[role] || badgeClassMap.USER,
  roleName: roleNameMap[role] || "리뷰어",
});
