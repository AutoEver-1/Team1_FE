<script setup>
import BasePoster from "../common/BasePoster.vue";

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
        :key="data.id"
        class="min-w-[160px] shrink-0"
      >
        <BasePoster
          :posterUrl="data.posterUrl"
          :title="data.title"
          :releaseDate="data.releaseDate"
          :director="data.director"
          :actors="data.actors"
        />
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
