<script setup>
import Header from "../components/common/Header.vue";
import Footer from "../components/common/Footer.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const isLargeHeader = ref(false);
const route = useRoute();

watch(
  () => route.path,
  (newPath) => {
    if (newPath !== "/") {
      isLargeHeader.value = false;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="min-h-screen bg-[#12100E] text-white">
    <Header :isLarge="isLargeHeader" />
    <main>
      <router-view @hero-visible="isLargeHeader = $event" />
    </main>
    <Footer />
  </div>
</template>
