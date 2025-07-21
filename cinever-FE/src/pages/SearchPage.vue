<script setup>
import { ref, computed, onMounted, watch } from "vue";
import BaseBackground from "../components/common/BaseBackground.vue";
import { getTopRated } from "../api/movieApi";
import SkeletonCard from "../components/search/SkeletonCard.vue";
import MovieCard from "../components/search/MovieCard.vue";
import DirectorActorCard from "../components/search/DirectorActorCard.vue";
import SkeletonUserCard from "../components/search/SkeletonUserCard.vue";
import ReviewerCard from "../components/search/ReviewerCard.vue";
import { useRoute, useRouter } from "vue-router";
import { getReviewerAll } from "../api/reviewerApi";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import BasePagination from "../components/common/BasePagination.vue";
import { getPaginatedList, getTotalPages } from "../services/paging";

// 탭 메뉴
const tabs = ["영화", "리뷰어", "감독", "배우"];
const selectedTab = ref("영화");

const route = useRoute();
const router = useRouter();
const keyword = computed(() => route.query.keyword || "");

const isLoading = ref(true);

const searchedReviewers = ref();
const topRatedMovieList = ref();

// 검색된 키워드 변화 감지
watch(
  () => route.query.keyword,
  (newKeyword, oldKeyword) => {
    if (newKeyword && newKeyword != oldKeyword) {
      keyword.value = newKeyword;
      // getSearchList();
    }
  },
  { immediate: true } // 첫 진입 시에도 실행됨(onMounted 생략)
);

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

onMounted(() => {
  getTopRatedMovieList();
  getSearchedReviewers();
});

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

const getTopRatedMovieList = async () => {
  isLoading.value = true;

  const startTime = Date.now();

  try {
    const res = await getTopRated();
    topRatedMovieList.value = res.data.movieList;
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
    // isLoading.value = false;
  }
};

const moviePage = ref(1);
const reviewerPage = ref(1);
const actorPage = ref(1); // 추가 필요 시
const directorPage = ref(1); // 추가 필요 시
const itemsPerPage = ref(12);

// 페이지 수 계산
const totalMoviePages = getTotalPages(topRatedMovieList, itemsPerPage);
const totalReviewerPages = getTotalPages(searchedReviewers, itemsPerPage);
const totalActorPages = getTotalPages(topRatedMovieList, itemsPerPage); // 임시
const totalDirectorPages = getTotalPages(topRatedMovieList, itemsPerPage); // 임시

// 각 페이지에 보여줄 목록
const paginatedMovieList = getPaginatedList(
  topRatedMovieList,
  moviePage,
  itemsPerPage
);
const paginatedReviewerList = getPaginatedList(
  searchedReviewers,
  reviewerPage,
  itemsPerPage
);
const paginatedActorList = getPaginatedList(
  topRatedMovieList,
  actorPage,
  itemsPerPage
); // 임시
const paginatedDirectorList = getPaginatedList(
  topRatedMovieList,
  directorPage,
  itemsPerPage
); // 임시

// // 페이지 이동 함수
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
              v-for="movie in paginatedMovieList"
              :key="movie.movieId"
              :movie="movie"
              @click="goToMovieDetail(movie.movieId)"
            />
          </template>
        </div>
        <!-- 페이지 네이션 -->
        <BasePagination
          v-if="!isLoading"
          :currentPage="moviePage"
          :totalPages="totalMoviePages"
          @change="moviePage = $event"
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
              v-for="reviewer in paginatedReviewerList"
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
              v-for="movie in topRatedMovieList"
              :key="movie.movieId"
              :movie="movie"
              @click="selectedItem = movie"
            />
          </template>
        </div>
      </template>
    </div>
  </BaseBackground>
</template>

<style scoped></style>
