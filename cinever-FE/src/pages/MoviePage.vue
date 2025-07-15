<template>
  <div
    class="bg-[url('../../assets/images/backgroundImg.png')] bg-cover bg-center"
  >
    <div class="w-full flex justify-center">
      <div class="w-[70%] my-36">
        <div class="flex flex-col gap-16">
          <!-- 영화 검색 -->
          <div class="flex gap-3 items-center">
            <!-- 필터링 선택 상자 -->
            <BaseSelectbox :option="searchOption" />
            <!-- 검색 입력창 -->
            <BaseInput
              v-model="keyword"
              placeholder="보고싶은 영화의 제목이나 배우를 검색해보세요"
              inputClass="w-[80%] border-amber-500 py-1 px-3 bg-amber-500 bg-opacity-20"
            />
            <!-- 검색 버튼 -->
            <BaseButton
              label="검색"
              class="min-w-[65px] bg-amber-500 hover:bg-amber-600 text-amber-900"
              @click="console.log(keyword)"
            />
          </div>

          <!-- 영화 목록 -->
          <div class="flex flex-col gap-12">
            <BoxOfficeRankingMovies />
            <LatestMovies />
            <TrendingMovies />
            <TopRatedMovies />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import BaseButton from "../components/common/BaseButton.vue";
import BaseInput from "../components/common/BaseInput.vue";
import BaseSelectbox from "../components/common/BaseSelectbox.vue";
import BoxOfficeRankingMovies from "../components/movie/BoxOfficeRankingMovies.vue";
import LatestMovies from "../components/movie/LatestMovies.vue";
import TrendingMovies from "../components/movie/TrendingMovies.vue";
import TopRatedMovies from "../components/movie/TopRatedMovies.vue";

const keyword = ref("");
const searchOption = [{ name: "제목" }, { name: "배우" }, { name: "감독" }];
</script>
