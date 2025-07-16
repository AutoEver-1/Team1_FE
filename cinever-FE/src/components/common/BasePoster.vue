<script setup>
import { ref } from "vue";
import BaseRating from "./BaseRating.vue";
import BaseBadge from "./BaseBadge.vue";

const isHover = ref(false);

defineProps({
  averageScore: Number,
  director: Array,
  genre: Array,
  isAdult: Boolean,
  movieId: Number,
  posterPath: String,
  releaseDate: String,
  title: String,
  tmdbScore: Number,
  cumulativeAttendance: Number,
});
</script>

<template>
  <div
    class="relative h-[240px] group/poster"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <div
      class="absolute top-0 left-0 bg-zinc-900 text-white rounded-xl shadow-2xl transition-all duration-300 ease-in-out overflow-hidden flex"
      :class="isHover ? 'w-[350px] z-50' : 'w-[160px]'"
    >
      <img
        :src="posterPath"
        alt="poster"
        class="w-[160px] h-full object-cover rounded-l-xl"
      />

      <div class="p-4 w-[240px] flex flex-col justify-center space-y-1">
        <!-- 박스오피스 관객수 -->
        <div
          v-if="cumulativeAttendance > 0"
          class="text-sm font-semibold text-amber-400 ease-in-out"
          :class="
            isHover
              ? 'opacity-100 translate-y-0 delay-200'
              : 'opacity-0 translate-y-2 delay-0'
          "
        >
          🔥관객 {{ cumulativeAttendance.toLocaleString() }}명 돌파!
        </div>

        <h2
          class="text-xl font-bold transition-all duration-500 ease-in-out"
          :class="
            isHover
              ? 'opacity-100 translate-y-0 delay-100'
              : 'opacity-0 translate-y-2 delay-0'
          "
        >
          {{ isHover ? title : "" }}

          <div class="font-light pt-1 pl-1 text-sm" v-show="isHover">
            <div
              class="flex items-center text-amber-400"
              v-if="averageScore != null"
            >
              <BaseRating :score="averageScore" size="14" />

              <span class="ml-2 text-sm font-medium text-amber-400">
                {{ isHover ? averageScore : "-" }}
              </span>
              <span class="text-xs font-medium text-gray-200 opacity-50">
                {{ isHover ? "\u00A0/ 5.0" : "" }}
              </span>
            </div>

            <div class="flex items-center space-x-2" v-if="tmdbScore != null">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                alt="IMDb"
                class="w-6 h-auto"
              />
              <span class="text-sm text-white">
                {{ isHover ? tmdbScore : "-" }}
              </span>
              <span class="text-xs text-gray-200 opacity-50">
                {{ isHover ? "/ 10.0" : "" }}
              </span>
            </div>
          </div>

          <p class="text-xs">개봉: {{ releaseDate.split("-")[0] }}</p>
          <p class="text-xs">
            감독: {{ director.map((d) => d.name).join(", ") }}
          </p>

          <div class="flex flex-wrap gap-1">
            <BaseBadge v-for="(g, i) in genre" :key="i" :label="g" />
          </div>
        </div>

        <RouterLink
          :to="`/movie/${movieId}`"
          class="mt-3 self-end border border-amber-400 text-amber-400 px-3 py-1 rounded text-sm hover:bg-amber-400 hover:text-black transition"
        >
          ＋ 자세히
        </RouterLink>
      </div>
    </div>
  </div>
</template>
