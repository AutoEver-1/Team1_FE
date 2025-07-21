<script setup>
import { ref, computed } from "vue";
import BaseRating from "./BaseRating.vue";
import BaseBadge from "./BaseBadge.vue";

const isHover = ref(false);

const props = defineProps({
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

const fullPosterUrl = computed(() => {
  if (!props.posterPath) return "";
  return props.posterPath.startsWith("http")
    ? props.posterPath
    : `https://image.tmdb.org/t/p/original${props.posterPath}`;
});
</script>

<template>
  <RouterLink :to="`/movie/${movieId}`">
    <div
      class="relative h-[180px] md:h-[240px] group/poster"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
    >
      <div
        class="absolute top-0 left-0 bg-zinc-900 text-white rounded-xl shadow-2xl transition-all duration-500 ease-in-out overflow-hidden flex"
        :class="isHover ? 'w-[370px] z-50' : 'w-[120px] md:w-[160px]'"
      >
        <img
          :src="fullPosterUrl"
          alt="poster"
          class="h-[180px] md:w-[160px] md:h-full object-cover rounded-l-xl"
        />

        <div
          class="p-4 w-full flex flex-col justify-center space-y-1 items-center"
        >
          <div v-show="isHover">
            <div
              v-if="cumulativeAttendance > 0"
              class="text-sm font-semibold text-amber-400 ease-in-out whitespace-nowrap overflow-hidden text-ellipsis"
              :class="
                isHover
                  ? 'opacity-100 translate-y-0 delay-200'
                  : 'opacity-0 translate-y-2 delay-0'
              "
            >
              {{
                isHover
                  ? "관객 " + cumulativeAttendance.toLocaleString() + "명 돌파!"
                  : ""
              }}
            </div>

            <h2
              class="text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis"
              :class="isHover ? 'opacity-100' : 'opacity-0'"
            >
              {{ title?.length > 12 ? title.slice(0, 12) + "..." : title }}
            </h2>

            <div
              class="font-light pt-1 pl-1 text-sm whitespace-nowrap overflow-hidden text-ellipsis"
              v-show="isHover"
            >
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
                <span class="ml-2 text-sm font-medium text-amber-400">
                  {{ isHover ? tmdbScore : "-" }}
                </span>
                <span class="text-xs text-gray-200 opacity-50">
                  {{ isHover ? "/ 10.0" : "" }}
                </span>
              </div>
            </div>

            <div class="space-y-1.5 pt-2">
              <BaseBadge :dataList="genre?.slice(0, 2)" index="#" />
              <p
                class="text-xs whitespace-nowrap overflow-hidden text-ellipsis pt-2"
              >
                개봉: {{ releaseDate.split("-")[0] }}
              </p>
              <p
                class="text-xs whitespace-nowrap overflow-hidden text-ellipsis"
                v-if="director != ''"
              >
                감독:
                {{
                  director
                    .map((d) => d.name)
                    .join(", ")
                    .slice(0, 15)
                }}...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
