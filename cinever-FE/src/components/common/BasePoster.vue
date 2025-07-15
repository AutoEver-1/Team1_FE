<script setup>
import BaseRating from "../common/BaseRating.vue";
import BaseBadge from "./BaseBadge.vue";
import { ref } from "vue";

const isHover = ref(false);

defineProps({
  averageScore: Number,
  director: Object,
  genre: Object,
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
    class="relative w-[160px] h-[240px] hover:w-[335px] transition-all duration-300 ease-in-out rounded-lg overflow-visible z-10 group/poster"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <div
      class="absolute inset-0 bg-zinc-900 text-white rounded-xl shadow-2xl transition-all duration-300 ease-in-out flex overflow-hidden"
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
          class="text-sm font-semibold text-center text-amber-400 transition-all duration-500 ease-in-out"
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
        </h2>

        <div class="p-1 space-y-2">
          <div
            class="flex flex-wrap gap-1 transition-all duration-500 ease-in-out"
            :class="
              isHover
                ? 'opacity-100 translate-y-0 delay-200'
                : 'opacity-0 translate-y-2 delay-0'
            "
          >
            <BaseBadge v-show="isHover" :dataList="genre" index="#" />
          </div>
          <div>
            <p
              class="text-xs transition-all duration-500 ease-in-out"
              :class="
                isHover
                  ? 'opacity-100 translate-y-0 delay-200'
                  : 'opacity-0 translate-y-2 delay-0'
              "
            >
              {{ isHover ? "개봉: " + releaseDate.split("-")[0] : "" }}
            </p>

            <p
              class="text-xs transition-all duration-500 ease-in-out"
              :class="
                isHover
                  ? 'opacity-100 translate-y-0 delay-200'
                  : 'opacity-0 translate-y-2 delay-0'
              "
            >
              {{
                isHover ? "감독: " + director.map((d) => d.name).join(", ") : ""
              }}
            </p>
          </div>
        </div>

        <div
          class="flex justify-end gap-2 transition-all duration-500 ease-in-out pt-4"
          :class="
            isHover
              ? 'opacity-100 translate-y-0 delay-300'
              : 'opacity-0 translate-y-2 delay-0'
          "
        >
          <RouterLink
            class="border border-amber-400 text-amber-400 px-3 py-1 rounded text-sm hover:bg-amber-400 hover:text-black"
            v-if="isHover"
            :to="`/movie/${movieId}`"
          >
            ＋ 자세히
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
