<!-- UserProfileDropdown.vue -->
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/userStore";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/vue/24/outline";

const userStore = useUserStore();
const router = useRouter();
const isSliderOpen = ref(false);

const logout = () => {
  userStore.clearUser();
  alert("로그아웃 되었습니다.");
  // 로그아웃 후 홈으로 리다이렉트
  router.push("/");
};
</script>

<template>
  <div
    class="relative user-dropdown select-none"
    @mouseenter="isSliderOpen = true"
    @mouseleave="isSliderOpen = false"
    @click="logout"
  >
    <!-- 로그 아웃 -->
    <div
      class="flex items-center px-2 hover:pr-4 py-1 rounded-full hover:bg-red-500/20 transition cursor-pointer"
    >
      <div
        class="w-9 h-9 border border-red-500 rounded-full overflow-hidden flex items-center justify-center"
      >
        <ArrowRightStartOnRectangleIcon class="w-6 h-6 text-red-500" />
      </div>

      <!-- 로그 아웃 라벨 -->
      <transition name="slide-fade">
        <span
          :class="[
            'ml-2 text-sm font-medium whitespace-nowrap transition-all duration-1000 overflow-hidden',
            isSliderOpen
              ? 'max-w-[200px] opacity-100 text-white'
              : 'max-w-0 opacity-0',
          ]"
        >
          {{ isSliderOpen ? "로그아웃" : "    " }}
          <!-- "로그아웃" -->
        </span>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
