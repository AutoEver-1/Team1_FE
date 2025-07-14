<template>
  <div class="flex flex-col items-center px-4 py-10">
    <!-- 프로필 컨테이너 -->
    <div class="flex w-[90%] w-max-3xl">
      <img
        src="/src/assets/Avatar.png"
        alt="프로필"
        class="w-[100px] sm:w-[200px]"
      />
      <div class="flex items-center ml-5 sm:ml-10">
        <p class="text-xl sm:text-3xl font-bold">User 1</p>
        <p
          class="text-xs sm:text-sm text-black font-bold px-2 mt-1 sm:mt-2 rounded bg-yellow-400 ml-1"
        >
          영화 평론가
        </p>
      </div>
    </div>

    <div class="w-[90%] max-w-4xl mt-20 relative">
      <div class="w-full text-left mb-4">
        <p class="text-xl font-bold">최근에 본 영화</p>
      </div>

      <!-- 좌우 버튼 -->
      <button
        @click="scrollLeft"
        class="hidden md:flex absolute left-[-50px] top-1/2 -translate-y-1/2 z-10 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-3 rounded-full shadow"
      >
        ←
      </button>
      <button
        @click="scrollRight"
        class="hidden md:flex absolute right-[-50px] top-1/2 -translate-y-1/2 z-10 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-3 rounded-full shadow"
      >
        →
      </button>

      <!-- 슬라이더 영역 -->
      <div
        ref="sliderRef"
        class="overflow-x-auto whitespace-nowrap scroll-smooth flex gap-6 no-scrollbar"
      >
        <img
          v-for="i in 10"
          :key="i"
          src="/src/assets/Avatar.png"
          alt="영화"
          class="inline-block rounded shadow-md shrink-0"
        />
      </div>
    </div>
    <div class="w-[90%] max-w-4xl mt-20 relative">
      <div class="w-full text-left mb-4">
        <p class="text-xl font-bold">위시리스트</p>
      </div>

      <!-- 좌우 버튼 -->
      <button
        @click="scrollLeft"
        class="hidden md:flex absolute left-[-50px] top-1/2 -translate-y-1/2 z-10 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-3 rounded-full shadow"
      >
        ←
      </button>

      <!-- 슬라이더 영역 -->
      <div
        ref="sliderRef"
        class="overflow-x-auto whitespace-nowrap scroll-smooth flex gap-6 no-scrollbar"
      >
        <img
          v-for="i in 10"
          :key="i"
          src="/src/assets/Avatar.png"
          alt="영화"
          class="inline-block rounded shadow-md shrink-0"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const sliderRef = ref(null);

const scrollLeft = () => {
  sliderRef.value?.scrollBy({ left: -680, behavior: "smooth" });
};
const scrollRight = () => {
  sliderRef.value?.scrollBy({ left: 184, behavior: "smooth" });
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
