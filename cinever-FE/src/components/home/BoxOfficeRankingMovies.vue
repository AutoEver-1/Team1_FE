<script setup>
import { onMounted, ref } from "vue";
import { getBoxOfficeRanking } from "../../api/movieApi";
import BoxOfficeSlider from "./BoxOfficeSlider.vue";

const boxOfficeMovieList = ref();

onMounted(() => {
  getBoxOfficeMovieList();
});

const getBoxOfficeMovieList = async () => {
  try {
    const res = await getBoxOfficeRanking();
    console.log(res);
    boxOfficeMovieList.value = res.data.movieList;
  } catch (error) {
    console.error("박스오피스 영화 목록 가져오기 실패:", error);
  }
};
</script>

<template>
  <div class="flex flex-col">
    <p class="text-white text-xl font-bold mb-2">박스오피스 흥행 중 !!</p>
    <div class="grid gap-4">
      <BoxOfficeSlider :dataList="boxOfficeMovieList" />
    </div>
  </div>
</template>
