<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/userStore";
import BaseSlideButton from "./BaseSlideButton.vue";
import {
  ArrowRightStartOnRectangleIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";
import MovieSearch from "../search/MovieSearch.vue";

defineProps({ isLarge: Boolean });

const isMenuOpen = ref(false);
const userStore = useUserStore();
const router = useRouter();

const navigateToProfile = () => {
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
    class="hidden md:flex fixed left-0 w-full h-32 z-40 bg-gradient-to-b from-[#12100E] to-transparent pointer-events-none transition-all duration-300"
    :class="[isLarge ? 'top-28 opacity-100' : 'top-16 opacity-0']"
  />

  <header
    :class="[
      'flex fixed top-0 left-0 w-full z-50 items-center justify-between transition-all duration-300 px-4 sm:px-6 lg:px-10',
      isLarge ? 'md:h-28 h-16 bg-[#12100E]' : 'h-16 bg-[#12100E]',
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
          to="/movie"
          class="hover:text-amber-400 relative"
          :class="{
            'text-amber-400': $route.path.startsWith('/movie'),
          }"
        >
          Movie
          <span
            v-if="$route.path.startsWith('/movie')"
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
      <div class="flex gap-2 items-center">
        <MovieSearch
          v-model="userStore.searchText"
          placeholder="영화 검색"
          :icon="MagnifyingGlassIcon"
          color="amber-500"
          hoverBg="hover:bg-amber-500/20"
          borderColor="border border-amber-500"
        />
        <template v-if="userStore.user">
          <!-- <BaseSlideButton
            :icon="MagnifyingGlassIcon"
            color="amber-500"
            hoverBg="hover:bg-amber-500/20"
            borderColor="border border-amber-500"
            :isSearch="true"
            v-model="searchText"
          /> -->
          <BaseSlideButton
            :label="userStore.user.nickName"
            :icon="
              userStore.user.profilePath === '1'
                ? UserIcon
                : userStore.user.profilePath
            "
            color="white"
            hoverBg="hover:bg-gray-800"
            :onClick="navigateToProfile"
            class="hidden md:block"
          />
          <BaseSlideButton
            :label="'로그아웃'"
            :icon="ArrowRightStartOnRectangleIcon"
            color="red-500"
            hoverBg="hover:bg-red-500/20"
            borderColor="border border-red-500"
            :onClick="logout"
            class="hidden md:block"
          />
        </template>

        <template v-else>
          <RouterLink to="/login">
            <button
              class="text-sm text-amber-400 hover:underline transition mr-3"
            >
              로그인
            </button>
          </RouterLink>
          <RouterLink to="/signup">
            <button class="text-sm text-amber-400 hover:underline transition">
              회원가입
            </button>
          </RouterLink>
        </template>
      </div>
    </div>
  </header>
</template>
