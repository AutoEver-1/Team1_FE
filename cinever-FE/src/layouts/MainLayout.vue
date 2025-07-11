<script setup>
import Header from "../components/common/Header.vue";
</script>
<template>
  <div class="min-h-screen bg-[#12100E] text-white">
    <Header />
    <main>
      <slot />
    </main>
  </div>
</template>
