<script setup>
import { ref } from "vue";

const isHover = ref(false);

defineProps({
  posterUrl: String,
  title: String,
  releaseDate: String,
  director: String,
  actors: String,
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
        src="../../assets/common.jpeg"
        alt="poster"
        class="w-[160px] h-full object-cover rounded-l-xl"
      />

      <div class="p-4 w-[240px] flex flex-col justify-center space-y-2">
        <h2
          class="text-xl font-bold transition-all duration-500 ease-in-out"
          :class="
            isHover
              ? 'opacity-100 translate-y-0 delay-100'
              : 'opacity-0 translate-y-2 delay-0'
          "
        >
          {{ isHover ? title : "" }}
        </h2>

        <p
          class="ml-1 text-xs transition-all duration-500 ease-in-out"
          :class="
            isHover
              ? 'opacity-100 translate-y-0 delay-200'
              : 'opacity-0 translate-y-2 delay-0'
          "
        >
          {{ isHover ? "개봉일: " + releaseDate : "" }}
        </p>

        <p
          class="ml-1 text-xs transition-all duration-500 ease-in-out"
          :class="
            isHover
              ? 'opacity-100 translate-y-0 delay-200'
              : 'opacity-0 translate-y-2 delay-0'
          "
        >
          {{ isHover ? "감독: " + director : "" }}
        </p>
        <p
          class="ml-1 text-xs transition-all duration-500 ease-in-out"
          :class="
            isHover
              ? 'opacity-100 translate-y-0 delay-200'
              : 'opacity-0 translate-y-2 delay-0'
          "
        >
          {{ isHover ? "배우: " + actors : "" }}
        </p>

        <div
          class="flex justify-end gap-2 transition-all duration-500 ease-in-out pt-4"
          :class="
            isHover
              ? 'opacity-100 translate-y-0 delay-300'
              : 'opacity-0 translate-y-2 delay-0'
          "
        >
          <button
            class="border border-white px-3 py-1.5 rounded text-sm"
            v-if="isHover"
          >
            ＋ 자세히
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
