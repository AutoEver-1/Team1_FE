<template>
  <div
    class="bg-[url('../../assets/images/backgroundImg.png')] bg-cover bg-top"
  >
    <div class="w-full flex justify-center">
      <div class="w-full max-w-7xl px-4 sm:px-6 lg:px-10 my-24 md:my-32">
        <!-- 장르 선택 가로 스크롤 -->
        <div
          class="flex gap-3 overflow-x-auto whitespace-nowrap no-scrollbar mb-8"
        >
          <button
            v-for="genre in genres"
            :key="genre"
            @click="selectedGenre = genre"
            :class="[
              'px-4 py-2 rounded-lg text-xs md:text-sm font-bold shrink-0',
              selectedGenre === genre
                ? 'bg-amber-500 border border-amber-500 text-amber-900'
                : 'bg-transparent border border-white/60 text-white/80',
            ]"
          >
            {{ genre }}
          </button>
        </div>

        <!-- 영화 카드 그리드 -->
        <MiniCardList :filteredMovies="filteredMovies" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getTop100 } from "../api/movieApi";
import MiniCardList from "../components/top100/MiniCardList.vue";

const movies = ref([]);
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
  } catch (error) {
    console.error("역대 최고 평점 영화 목록 가져오기 실패:", error);
  }
};

const filteredMovies = computed(() => {
  if (selectedGenre.value === "전체") return movies.value;
  return movies.value.filter((movie) =>
    movie.genre?.includes(selectedGenre.value)
  );
});
</script>

<style scoped>
::-webkit-scrollbar {
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 0px;
}
</style>
