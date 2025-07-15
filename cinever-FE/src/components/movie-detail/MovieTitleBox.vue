<script setup>
import BaseRating from "../common/BaseRating.vue";

defineProps({
  dataList: Object,
});
</script>
<template>
  <div>
    <h1 class="text-3xl font-bold flex items-center gap-2">
      {{ dataList.title }}
      <span
        v-if="dataList.isAdult"
        class="flex bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full mt-1 ml-1 w-6 h-6 text-center justify-center items-center"
      >
        19
      </span>
    </h1>
    <p class="text-sm mt-2">
      <span>개봉: {{ dataList.releaseDate.split("-")[0] }}</span>
      <br />
      <span>러닝타임: {{ dataList.runtime }}분</span>
    </p>
    <div class="flex items-center text-amber-400">
      <BaseRating :score="dataList.averageScore" size="20" />
      <span class="ml-2 text-[20px] font-medium text-amber-400">
        {{ dataList.averageScore ? dataList.averageScore : "-" }}
      </span>
      <span class="text-xs font-medium text-gray-200 opacity-50 mt-2">
        {{ dataList.averageScore ? "\u00A0/ 5.0" : "" }}
      </span>
    </div>

    <div class="flex items-center space-x-2">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
        alt="IMDb"
        class="mt-1 w-8 h-auto"
      />
      <span class="text-[16px] text-white">
        {{ dataList.tmdbScore ? dataList.tmdbScore : "-" }}
      </span>
      <span class="mt-1 text-xs text-gray-200 opacity-50">
        {{ dataList.tmdbScore ? "/ 10.0" : "" }}
      </span>
    </div>

    <p class="mt-4 text-sm text-gray-300 leading-relaxed">
      {{ dataList.description }}
    </p>
  </div>
</template>
