<script setup>
import BaseButton from "../common/BaseButton.vue";
import BasePosterSlider from "../common/BasePosterSlider.vue";
import { ref, onMounted } from "vue";
import { getOttExpect } from "../../api/movieApi";

const ottList = [
  {
    name: "넷플릭스",
    id: 1,
  },
  {
    name: "왓챠",
    id: 2,
  },
  {
    name: "디즈니+",
    id: 3,
  },
  {
    name: "웨이브",
    id: 4,
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
  console.log(dataList.value);
};

const handleOttSelect = (ottId) => {
  selectedOtt.value = ottId;
  getExpectList(ottId);
};
</script>

<template>
  <div
    class="relative z-10 flex flex-col items-center justify-center min-h-[100vh] text-white pt-16"
  >
    <div class="w-[70%]">
      <p class="text-white text-2xl font-bold mb-4">OTT별 개봉 예정작</p>

      <div class="flex gap-4 mb-10">
        <BaseButton
          v-for="ott in ottList"
          :key="ott.id"
          :label="ott.name"
          :btnClass="
            [
              ott.id === selectedOtt
                ? 'bg-yellow-400 text-black font-semibold'
                : 'bg-yellow-700 text-yellow-300 font-semibold',
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
