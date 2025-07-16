<script setup>
import { getMovieDetail } from "../api/movieApi";
import { getReview } from "../api/reviewApi";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import YoutubeVideo from "../components/movie-detail/YoutubeVideo.vue";
import MovieDetailLeft from "../components/movie-detail/MovieDetailLeft.vue";
import MovieTitleBox from "../components/movie-detail/MovieTitleBox.vue";
import BaseTab from "../components/common/BaseTab.vue";
import MovieReviewTab from "../components/movie-detail/MovieReviewTab.vue";
import MovieDetailTab from "../components/movie-detail/MovieDetailTab.vue";

const detailTab = [
  { id: 1, name: "영화 상세" },
  { id: 2, name: "영화 리뷰" },
];

const route = useRoute();
const movieData = ref();
const reviewData = ref();
const movieId = route.params.id;
const youtubeId = ref();
const selectedTab = ref(detailTab[0].id);

onMounted(() => {
  getMovieById();
  getReviewById();
});

const getReviewById = async () => {
  const res = await getReview(movieId);
  reviewData.value = res.data.reviewList;
  console.log(reviewData);
};

const getMovieById = async () => {
  const res = await getMovieDetail(movieId);
  movieData.value = res.data;
  console.log(movieData);

  const videoPath = movieData.value.video_path;
  youtubeId.value = new URL(videoPath).searchParams.get("v");
};
</script>

<template>
  <div
    class="bg-[url('../../assets/images/backgroundImg.png')] bg-cover bg-top mt-16"
  >
    <div class="relative w-full h-full">
      <div
        class="relative z-10 flex flex-col items-center justify-center text-white"
        v-if="movieData"
      >
        <YoutubeVideo :videoId="youtubeId" class="hidden md:block" />
        <div class="w-full px-4 md:px-8 lg:w-[70%]">
          <div class="text-white min-h-screen py-10">
            <div
              class="flex flex-col lg:flex-row gap-10 lg:mt-[25%] items-start"
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
                <div v-if="selectedTab == 1">
                  <MovieDetailTab :dataList="movieData" />
                </div>
                <div v-if="selectedTab == 2">
                  <MovieReviewTab :dataList="reviewData" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
