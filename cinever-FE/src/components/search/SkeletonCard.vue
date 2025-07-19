<!-- components/SkeletonCard.vue -->
<template>
  <div
    class="animate-pulse flex items-center gap-4 p-3 rounded-lg bg-white/5 backdrop-blur-lg"
  >
    <!-- 영화 포스터 이미지 영역 (스켈레톤) -->
    <div class="bg-white/10 h-24 w-16 rounded"></div>

    <!-- 영화 포스터 글자 영역 (스켈레톤) -->
    <div class="flex flex-col gap-3 py-1 flex-1">
      <div class="h-6 bg-white/10 rounded w-2/3"></div>
      <div class="h-4 bg-white/10 rounded w-1/3"></div>
      <div class="h-4 bg-white/10 rounded w-1/2"></div>
    </div>
  </div>
</template>
