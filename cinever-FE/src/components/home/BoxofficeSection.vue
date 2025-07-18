<script setup>
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import BaseYoutubeVideo from "../common/BaseYoutubeVideo.vue";
import BaseBadge from "../common/BaseBadge.vue";
import { getBoxOfficeRanking } from "../../api/movieApi";
import { useRouter } from "vue-router";

const router = useRouter();
const boxOfficeMovieList = ref();
const selectedMovie = ref(null);
const youtubeId = "42CK_hmKkq0";

onMounted(() => {
  getBoxOfficeMovieList();
});

const getBoxOfficeMovieList = async () => {
  try {
    const res = await getBoxOfficeRanking();
    boxOfficeMovieList.value = res.data.movieList;
    selectedMovie.value = boxOfficeMovieList.value[0];
    console.log(boxOfficeMovieList);
  } catch (error) {
    console.error("박스오피스 영화 목록 가져오기 실패:", error);
  }
};

const handleMovieClick = (movie) => {
  if (window.innerWidth < 768) {
    router.push(`/movie/${movie.movieId}`);
  } else {
    selectedMovie.value = movie;
  }
};
</script>

<template>
  <div
    class="relative w-full md:min-h-[100vh] md:bg-black text-white overflow-hidden md:top-12"
  >
    <div class="absolute top-0 left-0 w-full h-[95%] z-0 hidden md:block">
      <BaseYoutubeVideo
        :videoId="youtubeId"
        class="w-full h-full object-cover"
        :thumbnailUrl="
          'https://img.youtube.com/vi/' + youtubeId + '/maxresdefault.jpg'
        "
      />
      <div
        class="fade-overlay bottom-0 left-0 w-full h-48"
        style="--direction: to top"
      />
      <div
        class="fade-overlay top-0 left-0 h-full w-48"
        style="--direction: to right"
      />
      <div
        class="fade-overlay top-0 right-0 h-full w-48"
        style="--direction: to left"
      />
    </div>

    <div class="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
      <div
        class="w-full lg:w-[50%] h-full bg-gradient-to-r from-black/60 via-black/40 to-transparent"
      />
    </div>

    <div
      class="relative z-20 flex flex-col items-center gap-12 px-4 pt-24 pb-4 md:py-24 lg:py-36"
    >
      <div
        v-if="selectedMovie"
        class="w-full max-w-6xl text-white space-y-3 hidden md:block"
      >
        <div class="relative w-12 h-6 sm:w-14 sm:h-8">
          <div
            class="absolute top-0 left-0 w-full h-full bg-red-600 text-white text-xs sm:text-sm font-bold flex justify-center items-center rounded-t-md"
          >
            {{ selectedMovie?.rank || 1 }}위
          </div>
        </div>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          {{ selectedMovie.title }}
        </h1>

        <div class="mt-2">
          <BaseBadge :dataList="selectedMovie.genre" index="#" />
        </div>

        <p class="text-sm sm:text-base mt-3 font-medium">
          개봉일
          <span class="ml-2 text-amber-400 font-semibold">
            {{ new Date(selectedMovie.release_date).toLocaleDateString() }}
          </span>
        </p>

        <p class="text-sm sm:text-base font-medium">
          누적 관객 수
          <span class="ml-2 text-amber-400 font-semibold">
            {{ selectedMovie.cumulativeAttendance.toLocaleString() }}명
          </span>
        </p>

        <p class="text-xs sm:text-sm text-gray-300">
          감독
          <span class="ml-1">
            {{ selectedMovie.director.map((d) => d.name).join(", ") }}
          </span>
        </p>

        <div class="pt-4">
          <router-link
            :to="`/movie/${selectedMovie.movieId}`"
            class="inline-block border border-amber-400 text-amber-400 text-sm sm:text-base px-4 py-1.5 sm:px-5 sm:py-2 rounded font-semibold transition hover:bg-amber-400 hover:text-black"
          >
            + 자세히
          </router-link>
        </div>
      </div>

      <div class="w-full max-w-6xl">
        <Swiper
          :centered-slides="true"
          :loop="true"
          :space-between="6"
          :grab-cursor="true"
          :slide-to-clicked-slide="true"
          :effect="'coverflow'"
          :coverflow-effect="{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1.5,
            slideShadows: false,
          }"
          :breakpoints="{
            1280: { slidesPerView: 5 },
            1024: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            480: { slidesPerView: 2 },
            0: { slidesPerView: 1.3 },
          }"
        >
          <SwiperSlide
            v-for="movie in boxOfficeMovieList"
            :key="movie.movieId"
            class="flex justify-center items-center"
            @click="handleMovieClick(movie)"
          >
            <div class="relative transition-transform duration-300 ease-in-out">
              <div class="absolute top-2 left-2 z-10 w-6 sm:w-8">
                <svg
                  viewBox="0 0 100 120"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-full h-full text-red-600 fill-current"
                >
                  <path d="M0,0 H100 V100 L50,120 L0,100 Z" />
                  <text
                    x="50%"
                    y="60%"
                    dominant-baseline="middle"
                    text-anchor="middle"
                    font-size="30"
                    fill="white"
                    font-weight="bold"
                  >
                    {{ movie.rank }}
                  </text>
                </svg>
              </div>

              <img
                :src="
                  movie.movieId % 2 === 0
                    ? 'https://image.tmdb.org/t/p/original//9E0C4FVsGfQzeuQA7wMxYKwhxVv.jpg'
                    : 'https://image.tmdb.org/t/p/original//d2J5coWE1pRE0UQSPSxCWfMi60L.jpg'
                "
                alt=""
                class="w-64 sm:w-72 md:w-80 h-40 sm:h-44 object-cover rounded-md shadow-md max-w-none"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<style scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide > div {
  transform: scale(0.85);
  z-index: 1;
}

.swiper-slide-active > div {
  transform: scale(1);
  z-index: 10;
}

.swiper-slide-prev > div,
.swiper-slide-next > div {
  transform: scale(0.95);
  z-index: 5;
}

.fade-overlay {
  position: absolute;
  pointer-events: none;
  z-index: 20;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: linear-gradient(
    var(--direction),
    rgba(0, 0, 0, 0.4),
    transparent
  );
  -webkit-mask-image: linear-gradient(var(--direction), black, transparent);
  mask-image: linear-gradient(var(--direction), black, transparent);
}
</style>
