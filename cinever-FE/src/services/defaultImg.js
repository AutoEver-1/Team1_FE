import defaultImg from "../assets/images/default_profile.png";

export const getProfileImg = (url) => {
  // 유효하지 않은 값("1", null, undefined, '')는 default로 대체
  return !url || url === "1" ? defaultImg : url;
};
