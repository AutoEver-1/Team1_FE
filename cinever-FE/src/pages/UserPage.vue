<script setup>
import UserInfo from "../components/user-detail/UserInfo.vue";
import BaseTab from "../components/common/BaseTab.vue";
import { ref, onMounted } from "vue";
import UserMovieDetail from "../components/user-detail/UserMovieDetail.vue";
import UserReviewDetail from "../components/user-detail/UserReviewDetail.vue";
import {
  getUserWishlistInfo,
  getUserRecentInfo,
  getUserFavoriteInfo,
  getUserDislikeInfo,
  getUserReviewInfo,
} from "../api/user";
import { useRoute } from "vue-router";

const detailTab = [
  { id: 1, name: "프로필" },
  { id: 2, name: "리뷰" },
  { id: 3, name: "영화" },
  { id: 4, name: "위시리스트" },
];

const route = useRoute();
const selectedTab = ref(detailTab[0].id);
const wishlistList = ref([]);
const recentList = ref([]);
const favoriteList = ref([]);
const dislikeList = ref([]);
const reivewList = ref([]);

onMounted(() => {
  const id = route.params.id;
  userWishlistInfo(id);
  userRecentInfo(id);
  userFavoriteInfo(id);
  userDislikeInfo(id);
  userReviewInfo(id);
});

const userWishlistInfo = async (id) => {
  const res = await getUserWishlistInfo(id);
  wishlistList.value = res.data;
  console.log("userWishlistInfo", wishlistList.value);
};

const userRecentInfo = async (id) => {
  const res = await getUserRecentInfo(id);
  recentList.value = res.data;
  console.log("recentList", recentList.value);
};

const userFavoriteInfo = async (id) => {
  const res = await getUserFavoriteInfo(id);
  favoriteList.value = res.data;
  console.log("favoriteList", favoriteList.value);
};

const userDislikeInfo = async (id) => {
  const res = await getUserDislikeInfo(id);
  dislikeList.value = res.data;
  console.log("dislikeList", dislikeList.value);
};

const userReviewInfo = async (id) => {
  const res = await getUserReviewInfo(id);
  reivewList.value = res.data;
  console.log("reivewList", reivewList.value);
};
</script>

<template>
  <div
    class="bg-[url('../../assets/images/backgroundImg.png')] bg-cover bg-top"
  >
    <div class="pt-24 flex-1">
      <UserInfo />
      <div class="min-h-screen flex justify-center mt-12 max-w-4xl mx-auto">
        <div class="w-full space-y-6">
          <BaseTab
            v-model:selectedId="selectedTab"
            :tabList="detailTab"
            isFlex=""
          />
          <div class="pb-20" v-if="selectedTab == 1">
            <UserMovieDetail
              :wishlistList="wishlistList"
              :recentList="recentList"
              :favoriteList="favoriteList"
              :dislikeList="dislikeList"
              :reivewList="reivewList"
            />
          </div>
          <div v-if="selectedTab == 2">
            <UserReviewDetail />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
