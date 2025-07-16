<script setup>
import HeroSection from "../components/home/HeroSection.vue";
import QuoteSection from "../components/home/QuoteSection.vue";
import OTTExpectSection from "../components/home/OTTExpectSection.vue";
import OTTRecentlySection from "../components/home/OTTRecentlySection.vue";
import { onMounted, onUnmounted, defineEmits } from "vue";

const emit = defineEmits(["hero-visible"]);
let observer;

onMounted(() => {
  const hero = document.getElementById("section-1");
  observer = new IntersectionObserver(
    ([entry]) => {
      emit("hero-visible", entry.isIntersecting);
    },
    { threshold: 0.6 }
  );

  if (hero) observer.observe(hero);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<template>
  <div class="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
    <!-- section 1 -->
    <div
      id="section-1"
      class="relative snap-start w-full min-h-[100dvh] overflow-hidden"
    >
      <HeroSection />
    </div>

    <div
      class="bg-[url('../../assets/images/backgroundImg.png')] bg-cover bg-center"
    >
      <!-- section 2 -->
      <div class="relative snap-start w-full min-h-[100dvh] overflow-hidden">
        <QuoteSection />
      </div>

      <!-- section 3 -->
      <div class="relative snap-start w-full min-h-[100dvh] overflow-hidden">
        <OTTExpectSection />
      </div>

      <!-- section 4 -->
      <div class="relative snap-start w-full min-h-[100dvh] overflow-hidden">
        <OTTRecentlySection />
      </div>
    </div>
  </div>
</template>
