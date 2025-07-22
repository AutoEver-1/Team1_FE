<template>
  <BaseBackground>
    <div class="w-full flex justify-center">
      <div class="w-full max-w-7xl px-4 sm:px-6 lg:px-10 my-24 md:my-32">
        <div
          class="flex gap-3 overflow-x-auto whitespace-nowrap no-scrollbar mb-8"
        >
          <button
            v-for="genre in genres"
            :key="genre.id"
            @click="handleGenreClick(genre.id)"
            :class="[
              'px-4 py-2 rounded-lg text-xs md:text-sm font-bold shrink-0',
              selectedGenre === genre.id
                ? 'bg-amber-500 border border-amber-500 text-amber-900'
                : 'bg-transparent border border-white/60 text-white/80',
            ]"
          >
            {{ genre.name }}
          </button>
        </div>
        <SkeletonCard v-if="isLoading" />
        <MiniCardList v-show="!isLoading" :filteredMovies="filteredMovies" />
      </div>
    </div>
  </BaseBackground>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getTop100 } from "../api/movieApi";
import MiniCardList from "../components/top100/MiniCardList.vue";
import BaseBackground from "../components/common/BaseBackground.vue";
import SkeletonCard from "../components/top100/SkeletonCard.vue";

const genres = [
  { id: 2, name: "가족" },
  { id: 32, name: "공포" },
  { id: 15, name: "드라마" },
  { id: 13, name: "로맨스" },
  { id: 28, name: "미스터리" },
  { id: 24, name: "범죄" },
  { id: 21, name: "스릴러" },
  { id: 12, name: "애니메이션" },
  { id: 26, name: "어드벤처" },
  { id: 6, name: "액션" },
  { id: 11, name: "코미디" },
  { id: 4, name: "판타지" },
  { id: 27, name: "SF" },
];

const movies = ref([]);
const selectedGenre = ref(genres[0].id);
const isLoading = ref(false);

onMounted(() => {
  getTop100MovieList();
});

const getTop100MovieList = async (genreId = genres[0].id) => {
  try {
    isLoading.value = true;
    const res = await getTop100(genreId);
    movies.value = res.data.movieList;
  } catch (error) {
    console.error("getTop100:", error);
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 100);
  }
};

const handleGenreClick = (genreId) => {
  selectedGenre.value = genreId;
  getTop100MovieList(genreId);
};

const filteredMovies = computed(() => movies.value);
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
