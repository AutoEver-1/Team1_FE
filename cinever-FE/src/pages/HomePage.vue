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
  <div
    class="hidden md:block h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
  >
    <!-- section 1 -->
    <div
      id="section-1"
      class="relative snap-start w-full min-h-[100dvh] overflow-hidden"
    >
      <HeroSection />
    </div>

    <div
      class="bg-[url('../../assets/images/backgroundImg.png')] bg-cover bg-top"
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
  <div class="block md:hidden pb-[100px]">
    <div
      class="bg-[url('../../assets/images/backgroundImg.png')] bg-cover bg-top flex flex-col gap-[20px]"
    >
      <div class="pt-16">
        <div
          class="flex items-center justify-center mx-auto mt-8 bg-black w-80 h-40"
        >
          배너 예시
        </div>
      </div>

      <OTTExpectSection />
      <OTTRecentlySection />
    </div>
  </div>
</template>
