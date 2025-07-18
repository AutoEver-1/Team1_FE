<script setup>
import { onMounted, ref } from "vue";
import { getLatest } from "../../api/movieApi";
import BasePosterSlider from "../common/BasePosterSlider.vue";

const latestMovieList = ref();

onMounted(() => {
  getLatestMovieList();
});

const getLatestMovieList = async () => {
  try {
    const res = await getLatest();
    console.log(res);
    latestMovieList.value = res.data.movieList;
  } catch (error) {
    console.error("최신 영화 목록 가져오기 실패:", error);
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
        최신 개봉작은 ??
      </p>
      <div class="flex gap-6 flex-col">
        <BasePosterSlider :dataList="latestMovieList" />
      </div>
    </div>
  </div>
</template>
