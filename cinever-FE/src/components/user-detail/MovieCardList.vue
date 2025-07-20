<template>
  <div class="flex gap-4 overflow-x-auto">
    <div
      v-for="movie in list"
      :key="movie.movieId"
      class="min-w-[140px] bg-zinc-900 rounded-lg overflow-hidden shadow group relative"
    >
      <img
        :src="movie.posterPath"
        :alt="movie.title"
        class="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <RouterLink :to="`/movie/${movie.movieId}`">
        <div
          class="absolute left-0 right-0 bottom-0 h-5/6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-2 text-white text-sm text-center"
          style="
            background: linear-gradient(to top, rgba(0, 0, 0, 1), transparent);
          "
        >
          {{ movie.title }}
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
defineProps({ list: Array });
</script>
