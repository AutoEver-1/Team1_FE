<script setup>
import { getMovieDetail } from "../api/movieApi";
import { getReview } from "../api/reviewApi";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import BaseYoutubeVideo from "../components/common/BaseYoutubeVideo.vue";
import MovieDetailLeft from "../components/movie-detail/MovieDetailLeft.vue";
import MovieTitleBox from "../components/movie-detail/MovieTitleBox.vue";
import BaseTab from "../components/common/BaseTab.vue";
import MovieReviewTab from "../components/movie-detail/MovieReviewTab.vue";
import MovieDetailTab from "../components/movie-detail/MovieDetailTab.vue";
import BaseBackground from "../components/common/BaseBackground.vue";
import { watch } from "vue";
import { useRouter } from "vue-router";

const detailTab = [
  { id: "detail", name: "영화 상세" },
  { id: "review", name: "영화 리뷰" },
];

const route = useRoute();
const movieData = ref();
const reviewData = ref();
const movieId = route.params.id;
const selectedTab = ref("detail");
const router = useRouter();

onMounted(() => {
  const tabParam = route.query.tab;
  console.log(tabParam);
  if (tabParam === "review" || tabParam === "detail") {
    selectedTab.value = tabParam;
  }
  getMovieById();
  getReviewById();
});

onMounted(() => {
  getMovieById();
  getReviewById();
});

watch(selectedTab, (newTab) => {
  router.replace({ query: { ...route.query, tab: newTab } });
});

const getReviewById = async () => {
  const res = await getReview(movieId);
  reviewData.value = res.data.reviewList;
};

const getMovieById = async () => {
  const res = await getMovieDetail(movieId);
  movieData.value = res.data;

  console.log("getMovieById", movieData.value);
};
</script>

<template>
  <BaseBackground class="pt-14">
    <div class="relative w-full h-full">
      <div
        class="relative z-10 flex flex-col items-center justify-center text-white"
        v-if="movieData"
      >
        <BaseYoutubeVideo
          v-if="movieData.video_path"
          :videoId="movieData.video_path"
          :thumbnailUrl="
            'https://img.youtube.com/vi/' +
            movieData.video_path +
            '/maxresdefault.jpg'
          "
          class="hidden md:block"
        />
        <div class="w-full px-4 md:px-8 lg:w-[70%]">
          <div class="text-white min-h-screen py-10">
            <div
              class="flex flex-col lg:flex-row gap-10 items-start"
              :class="movieData.video_path ? 'lg:mt-[25%]' : 'mt-[5%]'"
            >
              <div class="w-full lg:w-[30%] lg:sticky top-16 self-start">
                <MovieDetailLeft :dataList="movieData" />
              </div>

              <div class="w-full lg:w-[70%] space-y-6">
                <MovieTitleBox :dataList="movieData" />
                <BaseTab
                  v-model:selectedId="selectedTab"
                  :tabList="detailTab"
                />
                <div v-if="selectedTab === 'detail'">
                  <MovieDetailTab :dataList="movieData" />
                </div>
                <div v-else-if="selectedTab === 'review'">
                  <MovieReviewTab
                    :dataList="reviewData"
                    :keywordList="movieData.keywordMap"
                    :movieId="movieId"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseBackground>
</template>
