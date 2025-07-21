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

// ----------- 상수 및 기본 데이터 -----------
const tabs = ["영화", "리뷰어", "감독", "배우"];

const tabToSearchType = {
  영화: "TITLE",
  리뷰어: "REVIEWER",
  감독: "DIRECTOR",
  배우: "ACTOR",
};

// ----------- 반응형 상태 변수 -----------
const selectedTab = ref("영화");
const keyword = computed(() => route.query.keyword || "");

const searchedMovies = ref([]);
const searchedReviewers = ref([]);
const searchedDirectors = ref([]);
const searchedActors = ref([]);

const moviePage = ref(1);
const reviewerPage = ref(1);
const directorPage = ref(1);
const actorPage = ref(1);

const totalMoviePages = ref(1);
const totalReviewerPages = ref(1);
const totalDirectorPages = ref(1);
const totalActorPages = ref(1);

const itemsPerPage = ref(12);

const isLoading = ref(true);

// ----------- computed -----------
const paginatedMovieList = computed(() =>
  getPaginatedList(searchedMovies, moviePage, itemsPerPage)
);

const paginatedReviewerList = computed(() =>
  getPaginatedList(searchedReviewers, reviewerPage, itemsPerPage)
);

const paginatedDirectorList = computed(() =>
  getPaginatedList(searchedDirectors, directorPage, itemsPerPage)
);

const paginatedActorList = computed(() =>
  getPaginatedList(searchedActors, actorPage, itemsPerPage)
);

// ----------- 라우터 -----------
const route = useRoute();
const router = useRouter();

// ----------- 함수 정의 -----------

// 검색 API 호출 함수
const fetchSearchResults = async (searchType, content, page = 0, size = 12) => {
  isLoading.value = true;

  try {
    const res = await getMoviesBySearch({
      searchType,
      content,
      page,
      size,
    });

    switch (searchType) {
      case "TITLE":
        searchedMovies.value = res.movieList?.content || [];
        totalMoviePages.value = Math.min(res.movieList?.totalPages || 1, 5);
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

// 페이지 변경 핸들러
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
  } catch (error) {
    console.error("불러오기 실패:", error);
  } finally {
    isLoading.value = false;
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
    searchedMovies.value = res.movieList?.content || [];
  } catch (error) {
    console.error("불러오기 실패:", error);
  } finally {
    const elapsed = Date.now() - startTime;
    const minimumDelay = 1500;
    const remainingDelay = Math.max(0, minimumDelay - elapsed);

    setTimeout(() => {
      isLoading.value = false;
    }, remainingDelay);
  }
};

// ----------- 라이프사이클 & 워치 -----------

onMounted(() => {
  getSearchedMovieList();
});

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
</script>

<template>
  <BaseBackground class="mt-16">
    <!-- 상단 검색 입력 결과 -->
    <div
      class="md:relative min-w-full md:bg-amber-300/20 rounded sticky top-16 md:top-0 bg-[#12100E] z-50"
    >
      <div class="flex justify-center">
        <div class="md:w-[70%] w-[90%] md:p-2 py-3">
          <span class="text-amber-500"> "{{ keyword }}"</span> 의 검색결과
        </div>
      </div>
    </div>
    <div class="relative md:w-[70%] w-[90%] min-h-[90vh] py-6 pb-20 mx-auto">
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
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4 pt-6 pb-2">
          <template v-if="isLoading && searchedMovies.length > 0">
            <SkeletonCard v-for="n in 16" :key="n" />
          </template>
          <template v-else>
            <template v-if="searchedMovies.length === 0">
              <div class="text-center text-gray-400 col-span-full py-48">
                검색 결과가 없습니다.
              </div>
            </template>
            <template v-else>
              <MovieCard
                v-for="movie in searchedMovies"
                :key="movie.movieId"
                :movie="movie"
                @click="goToMovieDetail(movie.movieId)"
              />
            </template>
          </template>
        </div>
        <!-- 페이지 네이션 -->
        <BasePagination
          v-if="!isLoading && searchedMovies.length > 0 && totalMoviePages > 1"
          :currentPage="moviePage"
          :totalPages="totalMoviePages"
          @change="handlePageChange"
        />
      </template>

      <!-- 리뷰어 검색 결과 -->
      <template v-else-if="selectedTab === '리뷰어'">
        <div class="grid md:grid-cols-4 grid-cols-1 gap-4 gap-y-6 pt-6 pb-2">
          <template v-if="isLoading && searchedReviewers.length > 0">
            <SkeletonUserCard v-for="n in 16" :key="n" />
          </template>
          <template v-else>
            <template v-if="searchedReviewers.length === 0">
              <div class="text-center text-gray-400 col-span-full py-48">
                검색 결과가 없습니다.
              </div>
            </template>
            <template v-else>
              <ReviewerCard
                v-for="reviewer in searchedReviewers"
                :key="reviewer.memberId"
                :reviewer="reviewer"
                @click="goToReviewerDetail(reviewer.memberId)"
              />
            </template>
          </template>
        </div>

        <!-- 페이지 네이션 -->
        <BasePagination
          v-if="
            !isLoading && searchedReviewers.length > 0 && totalReviewerPages > 1
          "
          :currentPage="reviewerPage"
          :totalPages="totalReviewerPages"
          @change="reviewerPage = $event"
        />
      </template>

      <!-- 감독,배우 검색 결과 -->
      <template v-else>
        <div class="grid md:grid-cols-6 grid-cols-2 gap-4 gap-y-10 mt-6">
          <template
            v-if="
              isLoading &&
              (selectedTab === '감독' ? searchedDirectors : searchedActors)
                .length > 0
            "
          >
            <SkeletonUserCard v-for="n in 16" :key="n" />
          </template>
          <template v-else>
            <template
              v-if="
                (selectedTab === '감독' ? searchedDirectors : searchedActors)
                  .length === 0
              "
            >
              <div class="text-center text-gray-400 col-span-full py-48">
                검색 결과가 없습니다.
              </div>
            </template>
            <template v-else>
              <DirectorActorCard
                v-for="item in selectedTab === '감독'
                  ? searchedDirectors
                  : searchedActors"
                :key="item.personId"
                :member="item"
                @click="selectedItem = item"
              />
            </template>
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
