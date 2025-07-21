<script setup>
import { ref, computed, onMounted, watch } from "vue";
import BaseBackground from "../components/common/BaseBackground.vue";
import { getMoviesBySearch, getTopRated } from "../api/movieApi";
import SkeletonCard from "../components/search/SkeletonCard.vue";
import MovieCard from "../components/search/MovieCard.vue";
import DirectorActorCard from "../components/search/DirectorActorCard.vue";
import SkeletonUserCard from "../components/search/SkeletonUserCard.vue";
import ReviewerCard from "../components/search/ReviewerCard.vue";
import { useRoute, useRouter } from "vue-router";
import { getReviewerAll } from "../api/reviewerApi";
import BasePagination from "../components/common/BasePagination.vue";
import { getPaginatedList, getTotalPages } from "../services/paging";

// 탭 메뉴
const tabs = ["영화", "리뷰어", "감독", "배우"];

// 탭 메뉴 값에 따라 영어 searchType 매핑 함수
const tabToSearchType = {
  영화: "TITLE",
  리뷰어: "REVIEWER",
  감독: "DIRECTOR",
  배우: "ACTOR",
};

// 기존 변수명 유지, 탭별 데이터 담을 변수 준비
const searchedMovies = ref([]);
const searchedReviewers = ref([]);
const searchedDirectors = ref([]);
const searchedActors = ref([]);

const moviePage = ref(1);
const reviewerPage = ref(1);
const directorPage = ref(1);
const actorPage = ref(1);

// 페이지 수 계산
const totalMoviePages = ref(1);
const totalReviewerPages = ref(1);
const totalDirectorPages = ref(1);
const totalActorPages = ref(1);

const itemsPerPage = ref(12);

const paginatedMovieList = computed(() =>
  getPaginatedList(searchedMovies, moviePage, itemsPerPage)
);
console.log(paginatedMovieList);

const paginatedReviewerList = computed(() =>
  getPaginatedList(searchedReviewers, reviewerPage, itemsPerPage)
);
const paginatedDirectorList = computed(() =>
  getPaginatedList(searchedDirectors, directorPage, itemsPerPage)
);
const paginatedActorList = computed(() =>
  getPaginatedList(searchedActors, actorPage, itemsPerPage)
);

// 검색 함수 (searchType, content, page, size를 받아 처리)
const fetchSearchResults = async (searchType, content, page = 0, size = 12) => {
  isLoading.value = true;

  try {
    const res = await getMoviesBySearch({
      searchType,
      content,
      page,
      size,
    });

    // 탭별 데이터 분기 저장
    switch (searchType) {
      case "TITLE":
        searchedMovies.value = res.movieList?.content || [];
        totalMoviePages.value = Math.min(res.movieList?.totalPages || 1, 5);
        console.log(searchedMovies.value);
        console.log(totalMoviePages.value);
        break;
      case "REVIEWER":
        searchedReviewers.value = res.reviewerList?.content || [];
        totalReviewerPages.value = Math.min(
          res.reviewerList?.totalPages || 1,
          5
        );
        break;
      case "DIRECTOR":
        searchedDirectors.value = res.directorList?.content || [];
        totalDirectorPages.value = Math.min(
          res.directorList?.totalPages || 1,
          5
        );
        break;
      case "ACTOR":
        searchedActors.value = res.actorList?.content || [];
        totalActorPages.value = Math.min(res.actorList?.totalPages || 1, 5);
        break;
    }
  } catch (e) {
    console.error("검색 실패:", e);
  } finally {
    isLoading.value = false;
  }
};

const handlePageChange = (page) => {
  switch (selectedTab.value) {
    case "영화":
      moviePage.value = page;
      fetchSearchResults("TITLE", keyword.value, page - 1);
      break;
    case "리뷰어":
      reviewerPage.value = page;
      fetchSearchResults("REVIEWER", keyword.value, page - 1);
      break;
    case "감독":
      directorPage.value = page;
      fetchSearchResults("DIRECTOR", keyword.value, page - 1);
      break;
    case "배우":
      actorPage.value = page;
      fetchSearchResults("ACTOR", keyword.value, page - 1);
      break;
  }
};

const selectedTab = ref("영화");

const route = useRoute();
const router = useRouter();
const keyword = computed(() => route.query.keyword || "");

const isLoading = ref(true);

// onMounted(() => {
//   // 데이터 fetch 예시
//   setTimeout(() => {
//     isLoading.value = false;
//   }, 1500); // 1.5초 후 로딩 종료
// });

const goToMovieDetail = (movieId) => {
  router.push(`movie/${movieId}`);
};

const goToReviewerDetail = (reviewerId) => {
  router.push(`user/${reviewerId}`);
};

const getSearchedReviewers = async () => {
  isLoading.value = true;
  try {
    const res = await getReviewerAll(0);
    searchedReviewers.value = res.data.reviewerList.content;
    console.log(res.data.reviewerList.content);
  } catch (error) {
    console.error("불러오기 실패:", error);
  }
};

const getSearchedMovieList = async () => {
  isLoading.value = true;

  const startTime = Date.now();

  try {
    const res = await getMoviesBySearch({
      searchType: "TITLE",
      content: keyword.value,
    });

    searchedMovies.value = res.movieList?.content || []; // 검색된 영화 리스트 배열 형태로
  } catch (error) {
    console.error("불러오기 실패:", error);
  } finally {
    // 의도적으로 애니메이션 추가
    const elapsed = Date.now() - startTime;
    const minimumDelay = 1500;
    const remainingDelay = Math.max(0, minimumDelay - elapsed);

    setTimeout(() => {
      isLoading.value = false;
    }, remainingDelay);
  }
};

// 처음은 영화 검색
onMounted(() => {
  getSearchedMovieList();
  // getSearchedReviewers();
});

// 검색된 키워드 변화/선택된 탭 감지
watch(
  [keyword, selectedTab],
  ([newKeyword, newTab], [oldKeyword, oldTab]) => {
    if (newKeyword && (newKeyword !== oldKeyword || newTab !== oldTab)) {
      const searchType = tabToSearchType[newTab];

      // 페이지 초기화
      switch (newTab) {
        case "영화":
          moviePage.value = 1;
          break;
        case "리뷰어":
          reviewerPage.value = 1;
          break;
        case "감독":
          directorPage.value = 1;
          break;
        case "배우":
          actorPage.value = 1;
          break;
      }

      fetchSearchResults(searchType, newKeyword, 0);
    }
  },
  { immediate: true }
);

// watch(
//   () => route.query.keyword,
//   (newKeyword, oldKeyword) => {
//     if (newKeyword && newKeyword !== oldKeyword) {
//       const searchType = tabToSearchType[selectedTab.value];
//       fetchSearchResults(searchType, newKeyword);
//     }
//   },
//   { immediate: true } // 처음 진입 시에도 실행됨
// );

// 페이지 이동 함수
// const goToPage = (page) => {
//   if (page >= 1 && page <= totalPages.value) {
//     currentPage.value = page;
//   }
// };
</script>

<template>
  <BaseBackground class="mt-16">
    <!-- 상단 검색 입력 결과 -->
    <div class="relative min-w-full bg-amber-300/20 rounded">
      <div class="flex justify-center">
        <div class="w-[70%] p-2">"{{ keyword }}" 의 검색결과</div>
      </div>
    </div>
    <div class="relative w-[70%] py-6 pb-20 mx-auto">
      <!-- 탭 메뉴 -->
      <div class="flex border-1 border-b-2 border-white/20">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="selectedTab = tab"
          :class="[
            'pb-3 px-6 text-sm font-semibold outline-none',
            selectedTab === tab
              ? 'border-b-2 border-amber-500 text-amber-500'
              : 'hover:text-amber-500',
          ]"
        >
          {{ tab }}
        </button>
      </div>

      <!-- 영화 검색 결과 -->
      <template v-if="selectedTab === '영화'">
        <div class="grid grid-cols-3 gap-4 pt-6 pb-2">
          <template v-if="isLoading">
            <SkeletonCard v-for="n in 16" :key="n" />
          </template>
          <template v-else>
            <MovieCard
              v-for="movie in searchedMovies"
              :key="movie.movieId"
              :movie="movie"
              @click="goToMovieDetail(movie.movieId)"
            />
          </template>
        </div>
        <!-- 페이지 네이션 -->
        <BasePagination
          v-if="!isLoading"
          :currentPage="reviewerPage"
          :totalPages="totalMoviePages"
          @change="handlePageChange"
        />
      </template>

      <!-- 리뷰어 검색 결과 -->
      <template v-else-if="selectedTab === '리뷰어'">
        <div
          class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6 pt-6 pb-2"
        >
          <template v-if="isLoading">
            <SkeletonUserCard v-for="n in 16" :key="n" />
          </template>
          <template v-else>
            <ReviewerCard
              v-for="reviewer in searchedReviewers"
              :key="reviewer.memberId"
              :reviewer="reviewer"
              @click="goToReviewerDetail(reviewer.memberId)"
            />
          </template>
        </div>

        <!-- 페이지 네이션 -->
        <BasePagination
          v-if="!isLoading"
          :currentPage="reviewerPage"
          :totalPages="totalReviewerPages"
          @change="reviewerPage = $event"
        />
      </template>

      <!-- 감독,배우 검색 결과 -->
      <template v-else>
        <div class="grid grid-cols-6 gap-4 gap-y-10 mt-6">
          <template v-if="isLoading">
            <SkeletonUserCard v-for="n in 16" :key="n" />
          </template>
          <template v-else>
            <DirectorActorCard
              v-for="item in selectedTab === '감독'
                ? searchedDirectors
                : paginatedActorList"
              :key="item.personId"
              :member="item"
              @click="selectedItem = item"
            />
          </template>
        </div>

        <!-- 페이지네이션 -->
        <!-- <BasePagination
          v-if="!isLoading"
          :currentPage="selectedTab === '감독' ? directorPage : actorPage"
          :totalPages="
            selectedTab === '감독' ? totalDirectorPages : totalActorPages
          "
          @change="
            (page) => {
              if (selectedTab === '감독') directorPage.value = page;
              else actorPage.value = page;
            }
          "
        />-->
      </template>
    </div>
  </BaseBackground>
</template>

<style scoped></style>
