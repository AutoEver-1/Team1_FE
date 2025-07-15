<script setup>
defineProps({ isLarge: Boolean });
</script>

<template>
  <div
    class="fixed left-0 w-full h-32 z-40 bg-gradient-to-b from-[#12100E] to-transparent pointer-events-none transition-all duration-300"
    :class="[isLarge ? 'top-28 opacity-100' : 'top-16 opacity-0']"
  />

  <header
    :class="[
      'fixed top-0 left-0 w-full z-50 flex items-center px-10 transition-all duration-300',
      isLarge ? 'h-28 bg-[#12100E]' : 'h-16 bg-[#12100E]',
    ]"
  >
    <div class="w-40 mr-10 p-6">
      <RouterLink to="/">
        <img src="../../assets/images/logo.png" />
      </RouterLink>
    </div>

    <nav class="flex gap-8 text-base font-bold text-gray-300">
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
        :class="{ 'text-amber-400': $route.path === '/movie' }"
      >
        Movie
        <span
          v-if="$route.path === '/movie'"
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
  </header>
</template>
