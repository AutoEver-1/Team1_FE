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
    const res = await getPopular(0, 28);
    popularMovieList.value = res.data.content;
    console.log(popularMovieList);
  } catch (error) {
    console.error("실시간 인기 영화 가져오기 실패:", error);
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
        실시간 인기 영화는 ??
      </p>
      <div class="flex gap-6 flex-col">
        <BasePosterSlider :dataList="popularMovieList" />
      </div>
    </div>
  </div>
</template>
