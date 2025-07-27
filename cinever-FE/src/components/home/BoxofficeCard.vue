<template>
  <div
    class="w-[350px] h-[200px] bg-gradient-to-br from-zinc-900 to-zinc-800/80 backdrop-blur-xl rounded-xl flex overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-xl"
  >
    <img :src="movie.posterPath" class="w-[40%] object-cover" />
    <div class="p-4 flex flex-col justify-center w-[60%] text-white text-sm">
      <h3 class="text-lg font-bold truncate">{{ movie.title }}</h3>
      <p class="text-xs text-gray-400">{{ movie.genre.join(", ") }}</p>
      <p class="text-xs text-gray-400">감독: {{ movie.director[0].name }}</p>
      <p class="text-xs text-gray-400">
        👥 {{ movie.cumulativeAttendance.toLocaleString() }}명
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  movie: Object,
});
</script>
