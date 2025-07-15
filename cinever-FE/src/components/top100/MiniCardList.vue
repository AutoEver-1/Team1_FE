<script setup>
import { ref } from "vue";

const props = defineProps({
  filteredMovies: {
    type: Array,
    requierd: true,
  },
});

// 각 영화가 wish에 들어있는지 여부를 저장
const wishList = ref([]);
wishList.value = [1, 2, 3];

const toggleWish = (movieId) => {
  const index = wishList.value.indexOf(movieId);

  // 이미 wish에 있다면 제거, 없다면 추가
  if (index !== -1) {
    wishList.value.splice(index, 1);
  } else {
    wishList.value.push(movieId);
  }
};
</script>

<template>
  <div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-10 gap-2 gap-y-8"
  >
    <div
      v-for="movie in filteredMovies"
      :key="movie.id"
      class="bg-zinc-900 rounded-lg overflow-hidden shadow-lg group relative"
    >
      <!-- 하트 아이콘 -->
      <button
        class="absolute top-2 right-2 z-10 text-white bg-black/50 rounded-full p-1 hover:bg-black/80 transition"
        @click.stop="toggleWish(movie.movieId)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          :class="[
            'w-4 h-4 transition',
            wishList.includes(movie.movieId) ? 'text-red-600' : 'text-white',
          ]"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M12.1 22.35l-1.45-1.32C5.4 16.36 2 13.28 2 9.5 2 6.42 
                4.42 4 7.5 4c1.74 0 3.41 0.81 4.5 2.09C13.09 
                4.81 14.76 4 16.5 4 19.58 4 22 6.42 22 
                9.5c0 3.78-3.4 6.86-8.55 
                11.54l-1.35 1.31z"
          />
        </svg>
      </button>

      <!-- 포스터 이미지 -->
      <img
        :src="movie.posterPath"
        :alt="movie.title"
        class="w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <!-- <div class="p-3">
        <h3 class="text-sm font-semibold truncate">{{ movie.title }}</h3>
        <div class="text-xs text-gray-400 mt-1">
          ⭐ {{ movie.rating }} | {{ movie.year }}
        </div>
      </div> -->

      <!-- Hover 시 설명 -->
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
