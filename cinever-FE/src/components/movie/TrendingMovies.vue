<script setup>
import { onMounted, ref } from "vue";
import { getPopular } from "../../api/movieApi";
import BasePosterSlider from "../common/BasePosterSlider.vue";

const popularMovieList = ref();

onMounted(() => {
  getPopularMovieList();
});

const getPopularMovieList = async () => {
  try {
    const res = await getPopular();
    popularMovieList.value = res.data.movieList;
  } catch (error) {
    console.error("실시간 인기 영화 가져오기 실패:", error);
  }
};
</script>

<template>
  <div class="flex flex-col">
    <p class="text-white text-xl font-bold mb-2">실시간 인기 영화는 ??</p>
    <div class="grid gap-4">
      <BasePosterSlider :dataList="popularMovieList" />
    </div>
  </div>
</template>
