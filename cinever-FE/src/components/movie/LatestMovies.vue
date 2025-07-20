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
  <div class="flex flex-col">
    <p class="text-white text-xl font-bold mb-2">최신 개봉작은 ??</p>
    <div class="grid gap-4">
      <BasePosterSlider :dataList="latestMovieList" />
    </div>
  </div>
</template>
