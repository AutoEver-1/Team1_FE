<script setup>
import BaseCard from "../common/BaseCard.vue";
import BasePosterSlider from "../common/BasePosterSlider.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  getUserWishlistInfo,
  getUserRecentInfo,
  getUserFavoriteInfo,
  getUserDislikeInfo,
} from "../../api/user";

const props = defineProps({ dataList: Object });

const wishlistList = ref([]); // 위시리스트
const recentList = ref([]); // 최근 본 영화
const favoriteList = ref([]); // 찜(좋아요) 영화
const dislikeList = ref([]); // 최악(싫어요) 영화

// 라우터에서 ID 추출 및 API 호출
const route = useRoute();

const userWishlistInfo = async (id) => {
  const res = await getUserWishlistInfo(id);
  wishlistList.value = res.data;
  console.log(wishlistList.value);
};

const userRecentInfo = async (id) => {
  const res = await getUserRecentInfo(id);
  recentList.value = res.data;
  console.log(recentList.value);
};

const userFavoriteInfo = async (id) => {
  const res = await getUserFavoriteInfo(id);
  favoriteList.value = res.data;
  console.log(favoriteList.value);
};

const userDislikeInfo = async (id) => {
  const res = await getUserDislikeInfo(id);
  dislikeList.value = res.data;
  console.log(dislikeList.value);
};

onMounted(() => {
  const id = route.params.id;
  userWishlistInfo(id);
  userRecentInfo(id);
  userFavoriteInfo(id);
  userDislikeInfo(id);
});
</script>

<template>
  <div class="space-y-3">
    <BaseCard title="위시리스트 영화">
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-red-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1 4.5 2.09C12.09 5 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </template>
      <template #contents>
        <!-- BasePosterSlider 컴포넌트에 위시리스트 데이터 전달 -->
        <BasePosterSlider :dataList="wishlistList.movieList" />
      </template>
    </BaseCard>
  </div>
  <div class="space-y-3">
    <BaseCard title="최근 본 영화">
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-red-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1 4.5 2.09C12.09 5 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </template>
      <template #contents>
        <BasePosterSlider :dataList="recentList.movieList" />
      </template>
    </BaseCard>
  </div>
  <div class="space-y-3">
    <BaseCard title="찜 영화">
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-red-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1 4.5 2.09C12.09 5 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </template>
      <template #contents>
        <BasePosterSlider :dataList="favoriteList.movieList" />
      </template>
    </BaseCard>
  </div>
  <div class="space-y-3">
    <BaseCard title="최악 영화">
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-red-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1 4.5 2.09C12.09 5 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </template>
      <template #contents>
        <BasePosterSlider :dataList="dislikeList.movieList" />
      </template>
    </BaseCard>
  </div>
</template>
