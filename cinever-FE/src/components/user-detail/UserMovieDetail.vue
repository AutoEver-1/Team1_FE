<script setup>
import MiniCardList from "../top100/MiniCardList.vue";

const props = defineProps({
  dataList: Object,
  movieType: String,
});
</script>

<template>
  <div class="w-full gap-4 flex flex-col">
    <p class="text-white md:px-10">
      <span class="text-amber-500 text-xl font-semibold mt-4">
        {{ dataList?.movieList.length }}
      </span>
      개의 {{ movieType }}
    </p>
    <MiniCardList :filteredMovies="dataList.movieList" />
  </div>
</template>
