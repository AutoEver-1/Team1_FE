<script setup>
import UserInfo from "../components/user-detail/UserInfo.vue";
import BaseTab from "../components/common/BaseTab.vue";
import { ref } from "vue";
import UserMovieDetail from "../components/user-detail/UserMovieDetail.vue";
import UserReviewDetail from "../components/user-detail/UserReviewDetail.vue";

const detailTab = [
  { id: 1, name: "My 영화" },
  { id: 2, name: "My 리뷰" },
];

const selectedTab = ref(detailTab[0].id);
</script>

<template>
  <div
    class="bg-[url('../../assets/images/backgroundImg.png')] bg-cover bg-top"
  >
    <div class="pt-24 flex-1">
      <UserInfo />
      <div class="min-h-screen flex justify-center mt-12 max-w-4xl mx-auto">
        <div class="w-full space-y-6">
          <BaseTab v-model:selectedId="selectedTab" :tabList="detailTab" />
          <div v-if="selectedTab == 1">
            <UserMovieDetail />
          </div>
          <div v-if="selectedTab == 2">
            <UserReviewDetail />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
