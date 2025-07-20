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
</script>

<template>
  <BaseBackground class="mt-16">
    <!-- 상단 검색 입력 결과 -->
    <div class="relative min-w-full bg-amber-300/20 rounded">
      <div class="flex justify-center">
        <div class="w-[70%] p-2">"{{ keyword }}" 의 검색결과</div>
      </div>
    </div>
    <div class="relative w-[70%] min-h-screen mx-auto">
      <!-- 탭 메뉴 -->
      <div class="flex my-4 border-1 border-b-2 border-white/20">
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
        <div class="grid grid-cols-3 gap-4 mt-6">
          <template v-if="isLoading">
            <SkeletonCard v-for="n in 16" :key="n" />
          </template>
          <template v-else>
            <MovieCard
              v-for="movie in topRatedMovieList"
              :key="movie.movieId"
              :movie="movie"
              @click="goToMovieDetail(movie.movieId)"
            />
          </template>
        </div>
      </template>

      <!-- 리뷰어 검색 결과 -->
      <template v-else-if="selectedTab === '리뷰어'">
        <div
          class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-8 mt-6"
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
