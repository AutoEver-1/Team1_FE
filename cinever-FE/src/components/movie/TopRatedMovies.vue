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
  <div class="flex flex-col">
    <p class="text-white text-xl font-bold mb-2">역대 최고 평점 영화 !!</p>
    <div class="grid gap-4">
      <BasePosterSlider :dataList="topRatedMovieList" />
    </div>
  </div>
</template>
