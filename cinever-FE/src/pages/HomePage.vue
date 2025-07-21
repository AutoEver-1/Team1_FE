<script setup>
import { onMounted, onUnmounted, defineEmits } from "vue";
import BoxofficeSection from "../components/home/BoxofficeSection.vue";
import OTTExpectSection from "../components/home/OTTExpectSection.vue";
import OTTRecentlySection from "../components/home/OTTRecentlySection.vue";
import QuoteSection from "../components/home/QuoteSection.vue";
import LatestMovies from "../components/home/LatestMovies.vue";
import TrendingMovies from "../components/home/TrendingMovies.vue";
import TopRatedMovies from "../components/home/TopRatedMovies.vue";
import ReviewRecentlySection from "../components/home/ReviewRecentlySection.vue";
import BaseBackground from "../components/common/BaseBackground.vue";
import Footer from "../components/common/Footer.vue";

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
    <div
      id="section-1"
      class="relative snap-start w-full h-[100dvh] overflow-hidden"
    >
      <BoxofficeSection />
    </div>

    <BaseBackground>
      <div
        class="relative snap-start w-full overflow-hidden pt-32 gap-14 flex flex-col"
      >
        <QuoteSection />
        <OTTExpectSection />
        <OTTRecentlySection />
        <ReviewRecentlySection />
        <LatestMovies />
        <TrendingMovies />
        <TopRatedMovies />
        <Footer />
      </div>
    </BaseBackground>
  </div>

  <div class="block md:hidden pb-[100px]">
    <div
      class="bg-[url('../../assets/images/backgroundImg.png')] bg-cover bg-top flex flex-col gap-[20px]"
    >
      <BoxofficeSection />
      <QuoteSection />
      <OTTExpectSection />
      <OTTRecentlySection />
      <ReviewRecentlySection />
      <LatestMovies />
      <TrendingMovies />
      <TopRatedMovies />
    </div>
  </div>
</template>
