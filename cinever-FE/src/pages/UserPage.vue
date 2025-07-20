<script setup>
import UserInfo from "../components/user-detail/UserInfo.vue";
import BaseTab from "../components/common/BaseTab.vue";
import { ref, onMounted, watch } from "vue";
import UserMovieDetail from "../components/user-detail/UserMovieDetail.vue";
import UserProfileDetail from "../components/user-detail/UserProfileDetail.vue";
import UserReviewDetail from "../components/user-detail/UserReviewDetail.vue";
import {
  getUserWishlistInfo,
  getUserRecentInfo,
  getUserFavoriteInfo,
  getUserDislikeInfo,
  getUserReviewInfo,
} from "../api/user";
import { useRouter, useRoute } from "vue-router";
import { getUserInfo } from "../api/user";

const detailTab = [
  { id: "profile", name: "프로필" },
  { id: "review", name: "리뷰" },
  { id: "movie", name: "영화" },
  { id: "wishlist", name: "위시리스트" },
];

const userInfo = ref(null);
const isFollowing = ref(false);
const router = useRouter();
const route = useRoute();
const selectedTab = ref(route.query.tab || "profile");
const wishlistList = ref([]);
const recentList = ref([]);
const favoriteList = ref([]);
const dislikeList = ref([]);
const reivewList = ref([]);

onMounted(() => {
  const id = route.params.id;
  fetchUserInfo(id);
  userWishlistInfo(id);
  userRecentInfo(id);
  userFavoriteInfo(id);
  userDislikeInfo(id);
  userReviewInfo(id);
});

watch(
  () => route.params.id,
  (newId) => {
    fetchUserInfo(newId);
    userWishlistInfo(newId);
    userRecentInfo(newId);
    userFavoriteInfo(newId);
    userDislikeInfo(newId);
    userReviewInfo(newId);
    selectedTab.value = "profile";
  }
);

watch(selectedTab, (newTab) => {
  router.replace({ query: { ...route.query, tab: newTab } });
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

const fetchUserInfo = async (id) => {
  const res = await getUserInfo(id);
  userInfo.value = res.data;
  isFollowing.value = res.data.isFollowing;
};
</script>

<template>
  <div
    class="bg-[url('../../assets/images/backgroundImg.png')] bg-cover bg-top pb-20"
  >
    <div class="pt-24 flex-1">
      <UserInfo
        :userInfo="userInfo"
        :reviewCount="reivewList.totalReviewCount"
        :isFollowing="isFollowing"
        @toggle-follow="toggleFollow"
      />
      <div class="min-h-screen flex justify-center mt-12 max-w-4xl mx-auto">
        <div class="w-[90%] md:w-full space-y-6">
          <BaseTab
            v-model:selectedId="selectedTab"
            :tabList="detailTab"
            isFlex=""
          />

          <div class="pb-20" v-if="selectedTab === 'profile'">
            <UserProfileDetail
              :wishlistList="wishlistList"
              :recentList="recentList"
              :favoriteList="favoriteList"
              :dislikeList="dislikeList"
              :reivewList="reivewList"
            />
          </div>
          <div v-else-if="selectedTab === 'review'">
            <UserReviewDetail :reivewList="reivewList" />
          </div>
          <div v-else-if="selectedTab === 'movie'">
            <UserMovieDetail :dataList="recentList" movieType="영화" />
          </div>
          <div v-else-if="selectedTab === 'wishlist'">
            <UserMovieDetail
              :dataList="wishlistList"
              movieType="보고싶은 영화"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
