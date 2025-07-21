<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";

defineProps({
  currentPage: Number,
  totalPages: Number,
});

defineEmits(["change"]);
</script>

<template>
  <div class="flex justify-center items-center gap-2 mt-7">
    <!-- 이전 버튼 -->
    <button
      :class="[
        'px-1 py-1 rounded-full bg-transparent outline-none',
        currentPage === 1 ? 'opacity-30' : 'hover:bg-white/20 cursor-pointer',
      ]"
      :disabled="currentPage === 1"
      @click="$emit('change', currentPage - 1)"
    >
      <ChevronLeftIcon class="w-6 h-6 font-bold text-amber-500/90" />
    </button>

    <!-- 페이지 번호 -->
    <button
      v-for="page in totalPages"
      :key="page"
      @click="$emit('change', page)"
      :class="[
        'px-3 py-1 rounded-full',
        currentPage === page
          ? 'bg-amber-500/90 text-amber-900 '
          : 'bg-transparent text-white/90 hover:bg-white/20',
      ]"
    >
      {{ page }}
    </button>

    <!-- 다음 버튼 -->
    <button
      :class="[
        'px-1 py-1 rounded-full bg-transparent outline-none',
        currentPage === totalPages
          ? 'opacity-30'
          : 'hover:bg-white/20 cursor-pointer',
      ]"
      :disabled="currentPage === totalPages"
      @click="$emit('change', currentPage + 1)"
    >
      <ChevronRightIcon class="w-6 h-6 font-bold text-amber-500/90" />
    </button>
  </div>
</template>
