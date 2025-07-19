<!-- components/common/UserDropdown.vue -->
<script setup>
import { ref } from "vue";
import { useUserStore } from "../../stores/userStore";
import { useRouter } from "vue-router";
import {
  ArrowRightStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";

const userStore = useUserStore();
const router = useRouter();

const goToProfile = () => {
  router.push("/mypage");
};

const logout = () => {
  userStore.clearUser();
  alert("로그아웃 되었습니다.");
  router.push("/");
};
</script>

<template>
  <div
    v-if="!userStore.isLoggedIn"
    class="relative group inline-block text-left"
  >
    <!-- 유저 프로필 버튼 -->
    <button
      class="flex items-center gap-2 px-2 py-2 rounded-full text-white bg-white/10 hover:bg-white/20 transition"
    >
      <component
        :is="userStore.user.profilePath === '1' ? UserIcon : 'img'"
        :src="
          userStore.user.profilePath !== '1'
            ? userStore.user.profilePath
            : undefined
        "
        class="w-5 h-5 rounded-full"
        @click="goToProfile"
      />
    </button>

    <!-- 드롭다운 메뉴 -->
    <div class="bg-black">
      <div
        class="absolute mt-2 right-0 w-32 bg-white/15 text-white/95 rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10"
      >
        <ul class="text-xs">
          <li
            @click="goToProfile"
            class="flex items-center gap-2 p-3 px-4 hover:bg-white/10 cursor-pointer rounded"
          >
            <UserIcon class="w-4 h-4" />
            마이페이지
          </li>
          <li
            @click="logout"
            class="flex items-center gap-2 p-3 px-4 hover:bg-white/10 cursor-pointer font-bold text-red-500 rounded"
          >
            <ArrowRightStartOnRectangleIcon class="w-4 h-4" />
            로그아웃
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
