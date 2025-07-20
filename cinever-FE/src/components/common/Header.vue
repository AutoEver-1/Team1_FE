<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/userStore";
import BaseSlideButton from "./BaseSlideButton.vue";
import {
  ArrowRightStartOnRectangleIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";
import MovieSearch from "../search/MovieSearch.vue";
import UserDropdown from "../user-profile/UserDropdown.vue";

defineProps({ isLarge: Boolean });

const isMenuOpen = ref(false);
const userStore = useUserStore();
const router = useRouter();

const navigateToFeed = () => {
  router.push("/feed");
};
</script>

<template>
  <div
    class="hidden md:flex fixed left-0 w-full h-10 z-40 bg-gradient-to-b from-[#12100E] to-transparent pointer-events-none transition-all duration-300"
    :class="[isLarge ? ' top-24 opacity-100' : 'top-16 opacity-0']"
  />

  <header
    :class="[
      'flex fixed top-0 left-0 w-full z-50 items-center justify-between transition-all duration-300 px-4 sm:px-6 lg:px-10',
      isLarge ? 'md:h-24 h-16 bg-[#12100E]' : 'h-16 bg-[#12100E]',
    ]"
  >
    <div class="flex items-center gap-8">
      <div class="w-auto p-4 sm:p-6">
        <RouterLink to="/">
          <img src="../../assets/images/logo.png" class="h-5 sm:h-7" />
        </RouterLink>
      </div>

      <nav
        class="hidden md:flex gap-6 text-sm sm:text-base font-bold text-gray-300"
      >
        <RouterLink
          to="/"
          class="hover:text-amber-400 relative"
          :class="{ 'text-amber-400': $route.path === '/' }"
        >
          Home
          <span
            v-if="$route.path === '/'"
            class="absolute -bottom-1 left-0 w-full h-[2px] bg-amber-400"
          ></span>
        </RouterLink>
        <RouterLink
          to="/top100"
          class="hover:text-amber-400 relative"
          :class="{ 'text-amber-400': $route.path === '/top100' }"
        >
          Top 100
          <span
            v-if="$route.path === '/top100'"
            class="absolute -bottom-1 left-0 w-full h-[2px] bg-amber-400"
          ></span>
        </RouterLink>
        <RouterLink
          to="/review"
          class="hover:text-amber-400 relative"
          :class="{ 'text-amber-400': $route.path === '/review' }"
        >
          Review
          <span
            v-if="$route.path === '/review'"
            class="absolute -bottom-1 left-0 w-full h-[2px] bg-amber-400"
          ></span>
        </RouterLink>
      </nav>
    </div>

    <div class="flex items-center gap-4">
      <div class="flex md:gap-1.5 items-center">
        <!-- 영화 검색 -->
        <MovieSearch
          v-model="userStore.searchText"
          placeholder="영화 검색"
          :icon="MagnifyingGlassIcon"
          color="amber-500"
          hoverBg="hover:bg-white/10"
        />
        <template v-if="userStore.isLoggedIn">
          <!-- 피드 바로가기 -->
          <BaseSlideButton
            label="피드 바로가기"
            :icon="DocumentTextIcon"
            class="hidden md:block"
            color="white"
            :onClick="navigateToFeed"
          />
          <UserDropdown class="hidden md:block" />
        </template>

        <template v-else>
          <RouterLink to="/login">
            <button
              class="text-sm items-center text-amber-400 hover:underline transition mx-2"
            >
              로그인
            </button>
          </RouterLink>
          <RouterLink to="/signup">
            <button
              class="text-sm text-amber-400 hover:underline transition mx-2"
            >
              회원가입
            </button>
          </RouterLink>
        </template>
      </div>
    </div>
  </header>
</template>
