<script setup>
import BaseButton from "../common/BaseButton.vue";
import BasePosterSlider from "../common/BasePosterSlider.vue";
import { ref, onMounted } from "vue";
import { getOttExpect, getOttRecently } from "../../api/movieApi";

// OTT 정보 리스트
const ottList = [
  {
    name: "넷플릭스",
    id: 11,
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Netflix_2015_N_logo.svg",
  },
  {
    name: "왓챠",
    id: 87,
    logo: "src/assets/watcha_icon.svg",
  },
  {
    name: "디즈니+",
    id: 350,
    logo: "https://static.kinolights.com/icon/btn_squircle_disneyplus.png",
  },
  {
    name: "웨이브",
    id: 371,
    logo: "src/assets/wave_icon.png",
  },
];

const selectedOtt = ref(ottList[0].id);
const dataList = ref([]);

// OTT ID → 데이터 키 매핑
const ottMovieKeyMap = {
  11: "netflixMovieList",
  87: "watchaMovieList",
  350: "disneyPlusMovieList",
  371: "waveMovieList",
};

// 특정 OTT에 대한 영화 리스트만 추출
const flattenMovieList = (rawData, ottId) => {
  const key = ottMovieKeyMap[ottId];
  return rawData?.[key] ?? [];
};

const loadAllOttData = async (id) => {
  try {
    const res_ex = await getOttExpect(id);
    const res_re = await getOttRecently(id);
    console.log(res_ex, res_re);
    dataList.value = [
      ...res_ex.data[ottMovieKeyMap[id]],
      ...res_re.data[ottMovieKeyMap[id]],
    ]; // ✅ 합쳐서 저장
  } catch (err) {
    console.error(` 데이터 불러오기 실패`, err);
  }
};

onMounted(() => {
  loadAllOttData(ottList[0].id);
});
</script>

<template>
  <div class="relative z-10 flex flex-col items-center text-white w-full">
    <div class="max-w-7xl w-full px-4">
      <p
        class="text-white text-md sm:text-2xl font-semibold md:font-bold mb-3 md:mb-6 text-left"
      >
        OTT별 최신 영화
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
          @click="loadAllOttData(ott.id)"
        />
      </div>

      <div class="flex gap-6 flex-col">
        <BasePosterSlider
          v-if="dataList.length"
          :dataList="dataList"
          title="개봉예정 + 최근작"
        />
        <div v-else class="text-amber-200">영화 정보가 없습니다.</div>
      </div>
    </div>
  </div>
</template>
