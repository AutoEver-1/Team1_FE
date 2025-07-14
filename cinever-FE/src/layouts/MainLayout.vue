<script setup>
import Header from "../components/common/Header.vue";
import { ref } from "vue";

const isLargeHeader = ref(true);
</script>

<template>
  <div class="min-h-screen bg-[#12100E] text-white">
    <Header :isLarge="isLargeHeader" />
    <main>
      <router-view @hero-visible="isLargeHeader = $event" />
    </main>
  </div>
</template>
