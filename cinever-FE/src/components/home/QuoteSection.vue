<template>
  <div class="relative w-full bg-amber-500 text-black py-6 shadow-lg">
    <div
      class="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0"
    >
      <!-- 왼쪽 인용문 -->
      <div class="text-center md:text-left flex-1">
        <p class="text-xs md:text-sm text-black/70 mb-1 tracking-wide">
          이 대사 기억나?
        </p>
        <blockquote
          class="text-lg md:text-2xl font-bold text-black leading-snug break-words"
        >
          “{{ famous.content }}”
        </blockquote>
      </div>

      <!-- 오른쪽 버튼 -->
      <div class="shrink-0">
        <RouterLink
          :to="`/movie/${famous.movieId}`"
          class="inline-block border border-black text-black hover:bg-black hover:text-amber-400 text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full transition duration-200"
        >
          영화 보러 가기 →
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getFamous } from "../../api/movieApi";
import { ref, onMounted } from "vue";

const famous = ref("");

onMounted(async () => {
  const res = await getFamous();
  famous.value = res.data;
});
</script>
