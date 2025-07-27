<script setup>
import { ref } from "vue";

const props = defineProps({
  filteredMovies: {
    type: Array,
    required: true,
  },
});

const wishList = ref([5, 12, 17, 18]);

const toggleWish = (movieId) => {
  const index = wishList.value.indexOf(movieId);
  if (index !== -1) {
    wishList.value.splice(index, 1);
  } else {
    wishList.value.push(movieId);
  }
};
</script>

<template>
  <div class="grid grid-cols-3 md:grid-cols-10 gap-2 sm:gap-3 sm:px-6 lg:px-10">
    <div
      v-for="movie in filteredMovies"
      :key="movie.movieId"
      class="bg-zinc-900 rounded-lg overflow-hidden shadow-lg group relative"
    >
      <!-- 포스터 이미지 -->
      <img
        :src="movie.posterPath"
        :alt="movie.title"
        class="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <!-- Hover 시 오버레이 -->
      <RouterLink :to="`/movie/${movie.movieId}`">
        <div
          class="absolute left-0 right-0 bottom-0 h-5/6 opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end"
          style="
            background: linear-gradient(to top, rgba(0, 0, 0, 1), transparent);
          "
        >
          <div class="text-sm text-white p-4 text-center">
            {{ movie.title }}
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
