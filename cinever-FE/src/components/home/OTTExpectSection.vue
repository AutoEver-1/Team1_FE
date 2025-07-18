<script setup>
import BaseButton from "../common/BaseButton.vue";
import BasePosterSlider from "../common/BasePosterSlider.vue";
import { ref, onMounted } from "vue";
import { getOttExpect } from "../../api/movieApi";

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
  getExpectList(selectedOtt.value);
});

const getExpectList = async (ottId) => {
  const res = await getOttExpect(ottId);
  dataList.value = res.data.expectedReleaseMovieList;
};

const handleOttSelect = (ottId) => {
  selectedOtt.value = ottId;
  getExpectList(ottId);
};
</script>

<template>
  <div class="relative z-10 flex flex-col items-center text-white w-full">
    <div class="max-w-7xl w-full px-4">
      <p
        class="text-white text-md sm:text-2xl font-semibold md:font-bold mb-3 md:mb-6 text-left"
      >
        OTT별 개봉 예정작
      </p>

      <div
        class="flex gap-3 text-xs overflow-x-auto flex-nowrap whitespace-nowrap no-scrollbar mb-5 md:mb-10 w-full"
      >
        <BaseButton
          v-for="ott in ottList"
          :key="ott.id"
          :label="ott.name"
          :icon="ott.logo"
          :btnClass="
            [
              'px-4 py-2 text-xs md:text-sm rounded-full transition-all duration-200 inline-flex items-center gap-2',
              ott.id === selectedOtt
                ? 'bg-amber-400 text-black font-semibold shadow w-28 md:w-36'
                : 'bg-transparent text-amber-200 border border-amber-400 hover:bg-amber-400 hover:text-black w-24 md:w-28',
            ].join(' ')
          "
          @click="handleOttSelect(ott.id)"
        />
      </div>

      <div class="flex gap-6 flex-col">
        <BasePosterSlider :dataList="dataList" />
      </div>
    </div>
  </div>
</template>
