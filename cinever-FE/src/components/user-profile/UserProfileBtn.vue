<!-- UserProfileDropdown.vue -->
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import userDefaultImg from "../../assets/images/userDefaultProfile.png";
import { useUserStore } from "../../stores/userStore";

const userStore = useUserStore();
const router = useRouter();
const isSliderOpen = ref(false);

const navigateToProfile = () => {
  router.push("/mypage");
};
</script>

<template>
  <div
    class="relative user-dropdown select-none"
    @mouseenter="isSliderOpen = true"
    @mouseleave="isSliderOpen = false"
    @click="navigateToProfile"
  >
    <div
      class="flex items-center px-2 hover:pr-4 py-1 rounded-full hover:bg-gray-800 transition cursor-pointer"
    >
      <!-- 프로필 이미지 -->
      <div
        class="w-9 h-9 border rounded-full overflow-hidden flex items-center justify-center"
      >
        <img
          :src="
            userStore.user.profilePath === '1'
              ? userDefaultImg
              : userStore.user.profilePath
          "
          alt="User avatar"
          class="w-6 h-6 object-cover"
        />
      </div>

      <!-- 닉네임 (상태 기반 슬라이드 등장) -->
      <transition name="slide-fade">
        <span
          :class="[
            'ml-2 text-sm font-medium whitespace-nowrap transition-all duration-300 overflow-hidden',
            isSliderOpen
              ? 'max-w-[200px] opacity-100 text-white'
              : 'max-w-0 opacity-0',
          ]"
        >
          {{ userStore.user.nickName }}
        </span>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
