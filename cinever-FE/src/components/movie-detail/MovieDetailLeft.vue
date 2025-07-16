<script setup>
import BaseCard from "../common/BaseCard.vue";

defineProps({
  dataList: Object,
});

const handelReviewed = () => {
  console.log("handelReviewed");
  // [TODO] BaseStarRating 연결 -> 별점 등록 -> isReviewed 업데이트
};

const handelWishlisted = () => {
  console.log("handelWishlisted");
};
</script>
<template>
  <img :src="dataList.posterPath" class="rounded-lg shadow-lg" />
  <div class="flex flex-col gap-2">
    <BaseCard
      backgroundColor="neutral-800"
      :title="dataList.reviewCount.toLocaleString() + '명'"
      titleClass="text-sm text-white"
      divClass="flex items-center justify-between"
    >
      <template #icon>
        <button
          @click="handelReviewed"
          class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 transition cursor-pointer"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            :stroke="dataList.isReviewed ? '#FDC500' : 'gray'"
            stroke-width="1.5"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </template>
    </BaseCard>

    <BaseCard
      backgroundColor="neutral-800"
      :title="dataList.wishListCount.toLocaleString() + '명'"
      titleClass="text-sm text-white"
      divClass="flex items-center justify-between"
    >
      <template #icon>
        <button
          @click="handelWishlisted"
          class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 transition cursor-pointer"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            :fill="dataList.isWishlisted ? '#FDC500' : 'gray'"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M12.001 4.529c2.349-2.332 6.142-2.295 8.444.074 2.27 2.337 2.324 6.123.158 8.516l-7.657 8.098a1.125 1.125 0 01-1.59 0l-7.658-8.098C1.234 10.726 1.29 6.94 3.56 4.603c2.302-2.37 6.095-2.406 8.441-.074z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </template>
    </BaseCard>

    <BaseCard backgroundColor="neutral-800">
      <template #contents>
        <div class="flex gap-2 w-full flex-wrap">
          <div v-for="ott in dataList.ottList" :key="ott.ottId">
            <img :src="ott.logoPath" class="w-10 h-10" />
          </div>
        </div>
      </template>
    </BaseCard>
  </div>
</template>
