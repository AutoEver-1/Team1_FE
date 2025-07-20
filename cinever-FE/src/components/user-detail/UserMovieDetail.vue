<script setup>
import BaseCard from "../common/BaseCard.vue";
import BasePosterSlider from "../common/BasePosterSlider.vue";
import { HeartIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  wishlistList: Object,
  recentList: Object,
  favoriteList: Object,
  dislikeList: Object,
  reivewList: Object,
});
</script>

<template>
  <div class="space-y-3">
    <BaseCard title="위시리스트 영화" backgroundColor="none">
      <template #icon>
        <HeartIcon class="w-4 h-4 text-red-500 mb-1" />
      </template>
      <template #contents>
        <!-- BasePosterSlider 컴포넌트에 위시리스트 데이터 전달 -->
        <BasePosterSlider :dataList="wishlistList.movieList" />
      </template>
    </BaseCard>
  </div>
  <div class="space-y-3">
    <BaseCard title="최근 본 영화" backgroundColor="none">
      <template #icon>
        <HeartIcon class="w-4 h-4 text-red-500 mb-1" />
      </template>
      <template #contents>
        <BasePosterSlider :dataList="recentList.movieList" />
      </template>
    </BaseCard>
  </div>
  <div class="space-y-3" backgroundColor="none">
    <BaseCard title="최고의 영화">
      <template #icon>
        <HeartIcon class="w-4 h-4 text-red-500 mb-1" />
      </template>
      <template #contents>
        <BasePosterSlider :dataList="favoriteList.movieList" />
      </template>
    </BaseCard>
  </div>
  <div class="space-y-3" backgroundColor="none">
    <BaseCard title="최악 영화">
      <template #icon>
        <HeartIcon class="w-4 h-4 text-red-500 mb-1" />
      </template>
      <template #contents>
        <BasePosterSlider :dataList="dislikeList.movieList" />
      </template>
    </BaseCard>
  </div>
</template>
