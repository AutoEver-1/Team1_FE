<template>
  <div
    @click="$emit('click', movie)"
    class="flex items-center gap-5 px-3 py-2 rounded-lg cursor-pointer border border-transparent bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all duration-300 overflow-hidden"
  >
    <img
      :src="movie.posterPath || fallbackImg"
      class="w-[70%] max-w-16 object-contain rounded"
    />
    <div class="flex flex-col gap-1 pb-1">
      <h2 class="text-base font-medium">{{ movie.title }}</h2>
      <p class="text-xs text-white/40">
        {{ directorNames }} · {{ releaseYear }}
      </p>
      <BaseRating score="4" class="mt-1" />
    </div>
  </div>
</template>

<script setup>
import BaseRating from "../common/BaseRating.vue";
import { computed } from "vue";
import fallbackImg from "../../assets/images/logo.png";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const directorNames = computed(() =>
  props.movie.director?.map((d) => d.name).join(", ")
);

const releaseYear = computed(
  () => props.movie.releaseDate?.slice(0, 4) || "개봉년도 미상"
);
</script>
