<script setup>
import BasePoster from "../common/BasePoster.vue";
import BaseButton from "../common/BaseButton.vue";

defineProps({
  dataList: Object,
});
</script>

<template>
  <div class="relative overflow-hidden group w-full mx-auto">
    <div
      class="flex gap-4 transition-transform duration-500 ease-in-out"
      style="transform: translateX(0)"
    >
      <div
        v-for="data in dataList"
        :key="data.movieId"
        class="min-w-[160px] shrink-0"
      >
        <div class="relative w-full h-full">
          <!-- 순위 동그라미 -->
          <div
            v-if="data.rank !== undefined"
            class="absolute z-20 top-2 left-2 w-8 h-8 rounded-full bg-amber-500 text-amber-800 border border-amber-600 text-xl font-bold flex items-center justify-center"
          >
            {{ data.rank }}
          </div>

          <!-- 기존 포스터 콘텐츠 -->
          <BasePoster
            :cumulativeAttendance="data.cumulativeAttendance"
            :director="data.director"
            :genre="data.genre"
            :movieId="data.movieId"
            :releaseDate="data.release_date"
            :title="data.title"
            :posterPath="data.posterPath"
          />
        </div>
      </div>
    </div>
    <BaseButton
      label="◀"
      btnClass="absolute h-full top-1/2 left-0 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
    />
    <BaseButton
      label="▶"
      btnClass="absolute h-full top-1/2 right-0 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
    />
  </div>
</template>
