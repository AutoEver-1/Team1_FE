<script setup>
import BaseCard from "../common/BaseCard.vue";
import BasePosterSlider from "../common/BasePosterSlider.vue";
import MovieCardList from "./MovieCardList.vue";
import RecentReviewList from "./RecentReviewList.vue";
import {
  HeartIcon,
  ClockIcon,
  TrophyIcon,
  TrashIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/vue/24/solid";

const props = defineProps({
  wishlistList: Object,
  recentList: Object,
  favoriteList: Object,
  dislikeList: Object,
  reivewList: Object,
});
</script>

<template>
  <div class="md:px-10 space-y-10">
    <!-- 📌 위시 ~ 최악의 영화 : 2열 그리드 -->
    <div class="grid grid-cols-1 gap-6">
      <!-- 각각의 BaseCard 컴포넌트 -->
      <BaseCard
        title="위시리스트 영화"
        v-if="wishlistList.movieList?.length != 0"
      >
        <template #icon>
          <HeartIcon class="w-4 h-4" />
        </template>
        <template #contents>
          <MovieCardList :list="wishlistList.movieList" />
        </template>
      </BaseCard>

      <BaseCard title="최근 본 영화" v-if="recentList.movieList?.length != 0">
        <template #icon>
          <ClockIcon class="w-4 h-4" />
        </template>
        <template #contents>
          <MovieCardList :list="recentList.movieList" />
        </template>
      </BaseCard>

      <BaseCard title="최근 리뷰" v-if="reivewList.reviewList?.length != 0">
        <template #icon>
          <ChatBubbleLeftRightIcon class="w-4 h-4" />
        </template>
        <template #contents>
          <RecentReviewList :list="reivewList.reviewList?.slice(0, 3)" />
        </template>
      </BaseCard>

      <BaseCard title="최고의 영화" v-if="favoriteList.movieList?.length != 0">
        <template #icon>
          <TrophyIcon class="w-4 h-4" />
        </template>
        <template #contents>
          <MovieCardList :list="favoriteList.movieList" />
        </template>
      </BaseCard>

      <BaseCard title="최악의 영화" v-if="dislikeList.movieList?.length != 0">
        <template #icon>
          <TrashIcon class="w-4 h-4" />
        </template>
        <template #contents>
          <MovieCardList :list="dislikeList.movieList" />
        </template>
      </BaseCard>
    </div>
  </div>
</template>
