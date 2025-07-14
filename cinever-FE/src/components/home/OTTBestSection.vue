<script setup>
import BaseButton from "../common/BaseButton.vue";
import BasePosterSlider from "../common/BasePosterSlider.vue";
import { ref } from "vue";

const ottList = ["넷플릭스", "왓챠", "디즈니+", "웨이브"];
const selectedOtt = ref(ottList[0]);

const movies = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  title: "아바타" + i,
  releaseDate: "2025.07",
  director: "김세민",
  actors: "오창은, 김호집",
  posterUrl: new URL("../../assets/common.jpeg", import.meta.url).href,
}));
</script>

<template>
  <div
    class="relative z-10 flex flex-col items-center justify-center min-h-[100vh] text-white pt-16"
  >
    <div class="w-[70%]">
      <p class="text-white text-2xl font-bold mb-4">OTT별 실시간 베스트</p>

      <div class="flex gap-4 mb-10">
        <BaseButton
          v-for="ott in ottList"
          :key="ott"
          :label="ott"
          :btnClass="
            [
              ott === selectedOtt
                ? 'bg-yellow-400 text-black font-semibold'
                : 'bg-yellow-700 text-yellow-300 font-semibold',
              'px-6 py-2 rounded-full w-32',
            ].join(' ')
          "
          @click="selectedOtt = ott"
        />
      </div>

      <div class="grid gap-4">
        <BasePosterSlider :dataList="movies" />
        <BasePosterSlider :dataList="movies" />
      </div>
    </div>
  </div>
</template>
