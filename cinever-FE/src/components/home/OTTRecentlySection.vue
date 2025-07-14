<script setup>
import BaseButton from "../common/BaseButton.vue";
import BasePosterSlider from "../common/BasePosterSlider.vue";
import { ref, onMounted } from "vue";
import { getOttRecently } from "../../api/movieApi";

const ottList = [
  {
    name: "넷플릭스",
    id: 1,
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Netflix_2015_N_logo.svg",
  },
  {
    name: "왓챠",
    id: 2,
    logo: "src/assets/watcha_icon.svg",
  },
  {
    name: "디즈니+",
    id: 3,
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
  },
  {
    name: "웨이브",
    id: 4,
    logo: "src/assets/wave_icon.png",
  },
];

const selectedOtt = ref(ottList[0].id);
const dataList = ref();

onMounted(() => {
  getRecentlyList(selectedOtt.value);
});

const getRecentlyList = async (ottId) => {
  const res = await getOttRecently(ottId);
  dataList.value = res.data.recentlyReleaseMovieList;
};

const handleOttSelect = (ottId) => {
  selectedOtt.value = ottId;
  getRecentlyList(ottId);
};
</script>

<template>
  <div
    class="relative z-10 flex flex-col items-center justify-center min-h-[100vh] text-white pt-16"
  >
    <div class="w-[70%]">
      <p class="text-white text-2xl font-bold mb-4">OTT별 최근 개봉작</p>

      <div class="flex gap-4 mb-10">
        <BaseButton
          v-for="ott in ottList"
          :key="ott.id"
          :label="ott.name"
          :icon="ott.logo"
          :btnClass="
            [
              ott.id === selectedOtt
                ? 'bg-amber-400 text-black font-semibold'
                : 'bg-transparent text-amber-200 border border-amber-400 rounded px-2 py-0.5 text-xs font-semibold',
              'px-6 py-2 rounded-full w-32',
            ].join(' ')
          "
          @click="handleOttSelect(ott.id)"
        />
      </div>

      <div class="grid gap-4">
        <BasePosterSlider :dataList="dataList" />
        <!-- <BasePosterSlider :dataList="dataList" /> -->
      </div>
    </div>
  </div>
</template>
