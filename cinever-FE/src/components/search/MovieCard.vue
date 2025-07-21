<template>
  <div
    @click="$emit('click', movie)"
    class="flex items-center gap-5 px-3 py-2 rounded-lg cursor-pointer bg-white/5 backdrop-blur-lg hover:bg-white/15 border border-white/10 shadow-lg transition-all duration-300 overflow-hidden"
  >
    <img :src="posterSrc" class="w-[70%] max-w-16 object-contain rounded" />

    <div class="flex flex-col gap-1 pb-1">
      <h2 class="text-base font-medium">{{ movie.title }}</h2>
      <p class="text-xs text-white/40">
        {{ directorNames }} · {{ releaseYear }}
      </p>
      <div class="flex items-center">
        <BaseRating :score="ratingScore" class="mt-1" />
        <span class="ml-1 pt-1 text-xs text-amber-500"
          >({{ ratingScoreDisplay }})</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseRating from "../common/BaseRating.vue";
import { computed } from "vue";
import fallbackImg from "../../assets/images/logo.png";
import { IMAGE_BASE_URL } from "../../utils/tmdbUrl";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const posterSrc = computed(() => {
  return props.movie.posterPath
    ? IMAGE_BASE_URL + props.movie.posterPath
    : fallbackImg;
});

// tmdb 별점 소숫점 3자리 > 반올림해서 정수형태로
const rawScore = props.movie.tmdbScore || 0;

// 별점은 .5 단위로 반올림
const ratingScore = computed(() => Math.round(rawScore * 2) / 2);

// 점수 출력 문자열: 소숫점 1자리까지만 자르기
const ratingScoreDisplay = computed(() => rawScore.toFixed(1));

// 감독이름 이어붙히기
const directorNames = computed(() =>
  props.movie.director?.map((d) => d.name).join(", ")
);

// 개봉날짜
const releaseYear = computed(
  () => props.movie.releaseDate?.slice(0, 4) || "개봉년도 미상"
);
</script>
