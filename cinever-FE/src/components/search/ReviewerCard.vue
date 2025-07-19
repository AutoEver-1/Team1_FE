<template>
  <div
    @click="$emit('click', movie)"
    class="flex flex-col items-center px-2 py-2 rounded-lg transition-all duration-300 overflow-hidden"
  >
    <!-- 이미지 (큰 원형) -->
    <div class="w-36 h-36 mb-3">
      <img
        :src="movie.posterPath || fallbackImg"
        class="w-full h-full object-cover rounded-full"
      />
    </div>

    <!-- 텍스트 정보 -->
    <div class="text-center flex flex-col gap-1">
      <h2 class="text-base font-semibold text-white">{{ movie.title }}</h2>
    </div>
  </div>
</template>

<script setup>
import fallbackImg from "../../assets/images/logo.png";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});
</script>
