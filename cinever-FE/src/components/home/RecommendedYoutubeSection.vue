<script setup>
import { ref } from "vue";

// const videoIds = [
//   "f607NYuwwxw",
//   "9lPf8wSGRxY",
//   "Txh6s4ONZ7k",
//   "fVTb09wkLcg",
//   "Ys5ikAs5_IE",
// ];

const allVideoIds = [
  "f607NYuwwxw",
  "9lPf8wSGRxY",
  "82gu0kLr9ZI",
  "cGUJUPvXoZ8",
  "wNuOZo8HO-o",
  "Txh6s4ONZ7k",
  "fVTb09wkLcg",
  "Ys5ikAs5_IE",
  "y83t8J0-MU4",
  "9ZiJMd1JNEU",
  "adEiR-DNX88",
  "51cPD0kTEh8",
];

const videoIds = ref(getRandomVideos(allVideoIds, 5));

const fading = ref(null); // 썸네일 사라짐 제어
const playing = ref(null); // iframe 렌더링 제어

const handleMouseEnter = (videoId) => {
  playing.value = videoId; // 바로 iframe 띄움
  fading.value = videoId; // 썸네일 천천히 사라지기 시작
};

const handleMouseLeave = () => {
  fading.value = null;
  playing.value = null;
};

function getRandomVideos(list, count) {
  return [...list].sort(() => Math.random() - 0.5).slice(0, count);
}
</script>

<template>
  <div class="relative z-10 flex flex-col items-center text-white w-full">
    <div class="max-w-7xl w-full px-4">
      <h2 class="text-xl md:text-2xl font-bold text-white mb-4">
        오늘의 추천 영화
      </h2>

      <div class="flex gap-4 pb-2">
        <div
          v-for="videoId in videoIds"
          :key="videoId"
          class="relative w-[232px] h-[420px] shrink-0 rounded-lg overflow-hidden cursor-pointer group"
          @mouseenter="handleMouseEnter(videoId)"
          @mouseleave="handleMouseLeave"
        >
          <iframe
            v-if="playing === videoId"
            class="w-full h-full absolute top-0 left-0 z-0 pointer-events-none"
            :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0&loop=1&playlist=${videoId}`"
            frameborder="0"
            allow="autoplay; encrypted-media"
          ></iframe>

          <img
            :src="`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`"
            alt="YouTube Thumbnail"
            :class="[
              'w-full h-full object-cover absolute top-0 left-0 z-10',
              fading === videoId
                ? 'transition-opacity duration-[500ms] delay-[900ms] opacity-0'
                : 'opacity-100',
            ]"
            @error="
              (e) =>
                (e.target.src = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`)
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
