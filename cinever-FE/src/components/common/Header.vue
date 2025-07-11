<script setup>
import { useRoute } from "vue-router";
const $route = useRoute();
</script>

<template>
  <header class="flex items-center px-10 py-6 bg-[#12100E]">
    <div class="w-40 mr-10 p-6">
      <img src="../../assets/logo.png" />
    </div>

    <nav class="flex gap-8 text-lg text-gray-300">
      <RouterLink
        to="/"
        class="hover:text-yellow-400 relative"
        :class="{ 'text-yellow-400': $route.path === '/' }"
      >
        Home
        <span
          v-if="$route.path === '/'"
          class="absolute -bottom-1 left-0 w-full h-[2px] bg-yellow-400"
        ></span>
      </RouterLink>
      <RouterLink
        to="/movie"
        class="hover:text-yellow-400 relative"
        :class="{ 'text-yellow-400': $route.path === '/movie' }"
      >
        Movie
        <span
          v-if="$route.path === '/movie'"
          class="absolute -bottom-1 left-0 w-full h-[2px] bg-yellow-400"
        ></span>
      </RouterLink>
      <RouterLink
        to="/review"
        class="hover:text-yellow-400 relative"
        :class="{ 'text-yellow-400': $route.path === '/review' }"
      >
        Review
        <span
          v-if="$route.path === '/review'"
          class="absolute -bottom-1 left-0 w-full h-[2px] bg-yellow-400"
        ></span>
      </RouterLink>
    </nav>
  </header>
</template>
