<template>
  <div
    class="flex flex-col items-center text-center px-4 py-10 mt-24 bg-[url('/src/assets/images/backgroundImg.png')] bg-cover bg-center"
  >
    <ReviewerSearchSection />

    <BestReviewerSection />
    <!-- 슬라이더 카드 영역 -->
    <div class="w-[90%] max-w-4xl mt-14 mb-20 relative">
      <p class="text-left mb-5 text-[28px]">Best Reviewer</p>
      <button
        @click="scrollLeft"
        class="absolute left-[-60px] top-1/2 -translate-y-1/2 z-10 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-3 rounded-lg"
      >
        ←
      </button>
      <button
        @click="scrollRight"
        class="absolute right-[-60px] top-1/2 -translate-y-1/2 z-10 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-3 rounded-lg"
      >
        →
      </button>

      <!-- 카드 리스트 -->
      <div
        ref="sliderRef"
        class="overflow-x-auto no-scrollbar whitespace-nowrap"
      >
        <div class="inline-flex gap-4">
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
      </div>
    </div>

    <!-- 테이블 -->
    <div class="w-[90%] max-w-4xl overflow-x-auto">
      <table class="min-w-full text-left text-sm text-white">
        <thead
          class="text-xs uppercase text-yellow-400 border-b border-yellow-400"
        >
          <tr>
            <th class="px-6 py-4">User name</th>
            <th class="px-6 py-4">like</th>
            <th class="px-6 py-4">reviews</th>
            <th class="px-6 py-4">movie</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 4" :key="i" class="border-b border-[#FFD40063]">
            <td class="flex items-center gap-3 px-6 py-4">
              <img
                src="/src/assets/Avatar.png"
                alt="img"
                class="w-8 h-8 rounded"
              />
              <span>Text</span>
            </td>
            <td class="px-6 py-6">Text</td>
            <td class="px-6 py-6">Text</td>
            <td class="px-6 py-6">Text</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import ReviewerSearchSection from "../components/reviewer/ReviewerSearchSection.vue";
import BestReviewerSection from "../components/reviewer/BestReviewerSection.vue";

import { ref } from "vue";

const sliderRef = ref(null);

const scrollLeft = () => {
  sliderRef.value?.scrollBy({ left: -680, behavior: "smooth" });
};
const scrollRight = () => {
  sliderRef.value?.scrollBy({ left: 680, behavior: "smooth" });
};
</script>

<style scoped>
/* ✅ 스크롤바 숨김 유틸 */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE & Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
