import api from "./index";

const movieApi = "/api/movie";

// 명대사 (famous quote)
export const getFamous = async () => {
  try {
    const response = await api.get(`${movieApi}/famous`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

// OTT 기대작
export const getOttExpect = async (ottId) => {
  try {
    const response = await api.get(`${movieApi}/ott/${ottId}/expect/release`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

// OTT 최근 개봉작
export const getOttRecently = async (ottId) => {
  try {
    const response = await api.get(`${movieApi}/ott/${ottId}/recently/release`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

// 영화 상세 정보
export const getMovieDetail = async (movieId) => {
  try {
    const response = await api.get(`${movieApi}/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

// 박스오피스
export const getBoxOfficeRanking = async () => {
  try {
    const response = await api.get(`${movieApi}/boxoffice`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

export const getLatest = async (page = 0, size = 20) => {
  try {
    const response = await api.get(`${movieApi}/latest`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

// 인기 영화 (페이징 포함 가능)
export const getPopular = async (page = 0, size = 20) => {
  try {
    const response = await api.get(`${movieApi}/popular`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

// 평점 높은 영화 (페이징 포함 가능)
export const getTopRated = async (page = 0, size = 20) => {
  try {
    const response = await api.get(`${movieApi}/top-rated`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

// TOP 100
export const getTop100 = async () => {
  try {
    const response = await api.get(`${movieApi}/top100`);
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

// 영화 검색
// searchType: TITLE, DIRECTOR, REVIEWER, ACTOR
export const getMoviesBySearch = async ({
  searchType = "Director",
  content,
  page = 0,
  size = 10,
}) => {
  try {
    const response = await api.get(`${movieApi}`, {
      params: {
        searchType,
        content,
        page,
        size,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};
