<script setup>
import { ref } from "vue";
import BaseButton from "../common/BaseButton.vue";

defineProps({
  dataList: Object,
});

const sliderX = ref(0);
const cardWidth = 224;
const maxOffset = -((10 - 4) * cardWidth);

const scrollLeft = () => {
  sliderX.value = Math.min(sliderX.value + cardWidth, 0);
};

const scrollRight = () => {
  sliderX.value = Math.max(sliderX.value - cardWidth, maxOffset);
};
</script>

<template>
  <p class="text-left mb-5 text-[28px]">Best Reviewer</p>

  <div class="relative overflow-hidden group w-full mx-auto">
    <!-- 슬라이더 리스트 -->
    <div
      class="flex gap-4 transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(${sliderX}px)` }"
    >
      <div
        v-for="i in 10"
        :key="'slider-card-' + i"
        class="relative w-[210px] shrink-0 flex flex-col items-center p-3 rounded-[10px] border border-white/20 bg-white/10 backdrop-blur-md shadow-md hover:bg-white/15 hover:backdrop-blur-lg transition duration-300"
      >
        <img
          src="/src/assets/Avatar.png"
          alt="프로필"
          class="rounded w-full h-auto mb-2"
        />
        <p class="text-white text-sm font-semibold">user name</p>
        <p class="text-xs text-gray-300 mt-1">❤️ 3.4k, ✏️ 200, 🎥 1.9k</p>

        <!-- 랭킹 넘버 -->
        <div
          class="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold"
        >
          {{ i }}
        </div>
      </div>
    </div>

    <!-- 좌우 버튼에 클릭 이벤트만 연결 -->
    <BaseButton
      label="◀"
      @click="scrollLeft"
      btnClass="absolute h-full top-1/2 left-0 -translate-y-1/2 
                bg-black/50 text-white p-3 rounded-full 
                opacity-0 group-hover:opacity-100 transition"
    />
    <BaseButton
      label="▶"
      @click="scrollRight"
      btnClass="absolute h-full top-1/2 right-0 -translate-y-1/2 
                bg-black/50 text-white p-3 rounded-full 
                opacity-0 group-hover:opacity-100 transition"
    />
  </div>
</template>
