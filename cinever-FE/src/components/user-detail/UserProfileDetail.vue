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
    <div class="grid grid-cols-1 gap-6">
      <BaseCard
        title="위시리스트 영화"
        v-if="wishlistList.movieList?.length != 0"
      >
        <template #icon>
          <HeartIcon class="w-4 h-4" />
        </template>
        <template #contents>
          <MovieCardList :list="wishlistList.movieList?.slice(0, 5)" />
        </template>
      </BaseCard>

      <BaseCard title="최근 본 영화" v-if="recentList.movieList?.length != 0">
        <template #icon>
          <ClockIcon class="w-4 h-4" />
        </template>
        <template #contents>
          <MovieCardList :list="recentList.movieList?.slice(0, 5)" />
        </template>
      </BaseCard>

      <BaseCard title="최근 리뷰" v-if="reivewList.reviewList?.length != 0">
        <template #icon>
          <ChatBubbleLeftRightIcon class="w-4 h-4" />
        </template>
        <template #contents>
          <RecentReviewList
            :list="reivewList.reviewList?.slice().reverse().slice(0, 3)"
          />
        </template>
      </BaseCard>

      <BaseCard title="최고의 영화" v-if="favoriteList.movieList?.length != 0">
        <template #icon>
          <TrophyIcon class="w-4 h-4" />
        </template>
        <template #contents>
          <MovieCardList :list="favoriteList.movieList?.slice(0, 5)" />
        </template>
      </BaseCard>

      <BaseCard title="최악의 영화" v-if="dislikeList.movieList?.length != 0">
        <template #icon>
          <TrashIcon class="w-4 h-4" />
        </template>
        <template #contents>
          <MovieCardList :list="dislikeList.movieList?.slice(0, 5)" />
        </template>
      </BaseCard>
    </div>
  </div>
</template>
