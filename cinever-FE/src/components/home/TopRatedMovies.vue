<script setup>
import { onMounted, ref } from "vue";
import { getTopRated } from "../../api/movieApi";
import BasePosterSlider from "../common/BasePosterSlider.vue";

const topRatedMovieList = ref();

onMounted(() => {
  getTopRatedMovieList();
});

const getTopRatedMovieList = async () => {
  try {
    const res = await getTopRated();
    topRatedMovieList.value = res.data.movieList;
  } catch (error) {
    console.error("역대 최고 평점 영화 목록 가져오기 실패:", error);
  }
};
</script>

<template>
  <div
    class="relative z-10 flex flex-col items-center justify-center text-white w-full"
  >
    <div class="w-full max-w-7xl px-4">
      <p
        class="text-white text-md sm:text-2xl font-semibold md:font-bold mb-3 md:mb-6 text-left"
      >
        역대 최고 평점 영화 !!
      </p>
      <div class="flex gap-6 flex-col">
        <BasePosterSlider :dataList="topRatedMovieList" />
      </div>
    </div>
  </div>
</template>
