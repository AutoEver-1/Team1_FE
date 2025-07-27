import axios from "axios";

export const fetchKeywords = async (review) => {
  try {
    // [TODO] ai 서버 배포 되면 url 수정
    const res = await axios.post("http://localhost:5050/analyze", {
      review,
    });
    return res.data.keywords;
  } catch (err) {
    console.error("키워드 추출 실패:", err);
    return [];
  }
};
