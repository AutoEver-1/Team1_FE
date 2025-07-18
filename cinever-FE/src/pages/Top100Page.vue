<template>
  <BaseBackground>
    <div class="w-full flex justify-center">
      <div class="w-[70%] my-36">
        <!-- 장르 선택 그리드 -->
        <div class="flex flex-wrap gap-4 mb-8">
          <button
            v-for="genre in genres"
            :key="genre"
            @click="selectedGenre = genre"
            :class="[
              `px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap`,
              selectedGenre === genre
                ? 'bg-amber-500 border border-amber-500 text-amber-900'
                : 'bg-transparent border border-white/60 text-white/80',
            ]"
          >
            {{ genre }}
          </button>
        </div>

        <!-- top 100 영화 카드 그리드 -->
        <MiniCardList :filteredMovies="movies" />
      </div>
    </div>
  </BaseBackground>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getTop100 } from "../api/movieApi";
import MiniCardList from "../components/top100/MiniCardList.vue";
import BaseBackground from "../components/common/BaseBackground.vue";

const movies = ref();
const genres = [
  "전체",
  "액션",
  "드라마",
  "코미디",
  "로맨스",
  "SF",
  "판타지",
  "공포",
  "애니메이션",
];
const selectedGenre = ref("전체");

onMounted(() => {
  getTop100MovieList();
});

const getTop100MovieList = async () => {
  try {
    const res = await getTop100();
    movies.value = res.data.movieList;
    console.log(movies.value);
  } catch (error) {
    console.error("역대 최고 평점 영화 목록 가져오기 실패:", error);
  }
};

const filteredMovies = computed(() =>
  movies.value.filter((movie) => movie.genre === selectedGenre.value)
);
</script>

<style scoped>
/* 간단한 스크롤 스타일 */
::-webkit-scrollbar {
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 3px;
}
</style>
