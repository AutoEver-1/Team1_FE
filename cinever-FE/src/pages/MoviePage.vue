<!-- BoxOfficeRanking.vue -->
<template>
  <BaseBackground>
    <div class="w-full flex justify-center">
      <div class="w-[70%] my-20">
        <!-- 영화 목록 -->
        <div class="flex flex-col gap-12">
          <BoxOffice />
          <BoxOfficeRankingMovies />
          <LatestMovies />
          <TrendingMovies />
          <TopRatedMovies />
        </div>
      </div>
    </div>
  </BaseBackground>
</template>

<script setup>
import BoxOfficeRankingMovies from "../components/home/BoxOfficeRankingMovies.vue";
import LatestMovies from "../components/home/LatestMovies.vue";
import TrendingMovies from "../components/home/TrendingMovies.vue";
import TopRatedMovies from "../components/home/TopRatedMovies.vue";
import BaseBackground from "../components/common/BaseBackground.vue";
</script>

<style scoped>
/* 추가적인 스타일이 필요하면 여기에 작성 */
</style>
