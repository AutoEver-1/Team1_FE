<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/userStore";
import userDefaultImg from "../../assets/images/userDefaultProfile.png";
import UserProfile from "../user-profile/UserProfileBtn.vue";
import LogoutBtn from "../user-profile/LogoutBtn.vue";

defineProps({ isLarge: Boolean });

const isMenuOpen = ref(false);
const userStore = useUserStore();
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
          <img src="../../assets/images/logo.png" class="h-6 sm:h-7" />
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
      <div class="hidden md:flex items-center">
        <template v-if="userStore.user">
          <LogoutBtn />
          <UserProfile />
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

      <button
        @click="isMenuOpen = !isMenuOpen"
        class="block md:hidden p-2 text-gray-200 focus:outline-none"
      >
        <svg
          v-if="!isMenuOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </header>

  <transition name="fade">
    <nav
      v-if="isMenuOpen"
      class="md:hidden fixed top-16 w-full bg-[#12100E] z-40 flex flex-col items-start gap-4 px-6 py-4 text-gray-300 text-sm font-bold"
    >
      <RouterLink
        to="/"
        @click="isMenuOpen = false"
        class="w-full hover:text-amber-400"
        :class="{ 'text-amber-400': $route.path === '/' }"
      >
        Home
      </RouterLink>
      <RouterLink
        to="/movie"
        @click="isMenuOpen = false"
        class="w-full hover:text-amber-400"
        :class="{ 'text-amber-400': $route.path === '/movie' }"
      >
        Movie
      </RouterLink>
      <RouterLink
        to="/top100"
        @click="isMenuOpen = false"
        class="w-full hover:text-amber-400"
        :class="{ 'text-amber-400': $route.path === '/top100' }"
      >
        Top 100
      </RouterLink>
      <RouterLink
        to="/review"
        @click="isMenuOpen = false"
        class="w-full hover:text-amber-400"
        :class="{ 'text-amber-400': $route.path === '/review' }"
      >
        Review
      </RouterLink>
      <RouterLink
        to="/mypage"
        @click="isMenuOpen = false"
        class="w-full hover:text-amber-400"
        :class="{ 'text-amber-400': $route.path === '/mypage' }"
      >
        MyPage
      </RouterLink>
    </nav>
  </transition>
</template>
