<script setup>
import { onMounted, onUnmounted, defineEmits, ref } from "vue";
import BoxofficeSection from "../components/home/BoxofficeSection.vue";
import OTTExpectSection from "../components/home/OTTExpectSection.vue";
// import OTTRecentlySection from "../components/home/OTTRecentlySection.vue";
import QuoteSection from "../components/home/QuoteSection.vue";
import LatestMovies from "../components/home/LatestMovies.vue";
import TrendingMovies from "../components/home/TrendingMovies.vue";
import TopRatedMovies from "../components/home/TopRatedMovies.vue";
import RecommendedYoutubeSection from "../components/home/RecommendedYoutubeSection.vue";
import ReviewRecentlySection from "../components/home/ReviewRecentlySection.vue";
import BaseBackground from "../components/common/BaseBackground.vue";
import EmojiQuizBanner from "../components/home/EmojiQuizBanner.vue";
import Footer from "../components/common/Footer.vue";

const isMobile = ref(false);
const boxofficeLoaded = ref(false);

onMounted(() => {
  isMobile.value = window.innerWidth < 768;
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
};

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
    v-if="!isMobile"
    class="hidden md:block h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
  >
    <div
      id="section-1"
      class="relative snap-start w-full h-[100dvh] overflow-hidden"
    >
      <BoxofficeSection @loaded="boxofficeLoaded = true" />
    </div>

    <BaseBackground v-if="boxofficeLoaded">
      <div
        class="relative snap-start w-full overflow-hidden pt-32 gap-14 flex flex-col"
      >
        <QuoteSection />
        <TrendingMovies />
        <TopRatedMovies />
        <RecommendedYoutubeSection />
        <OTTExpectSection />
        <ReviewRecentlySection />
        <LatestMovies />
        <EmojiQuizBanner />
        <Footer />
      </div>
    </BaseBackground>
  </div>

  <div v-else class="block md:hidden pb-[100px]">
    <div
      class="bg-[url('../../assets/images/backgroundImg.png')] bg-cover bg-top flex flex-col gap-[20px]"
    >
      <BoxofficeSection />
      <QuoteSection />
      <TrendingMovies />
      <OTTExpectSection />
      <ReviewRecentlySection />
      <TopRatedMovies />
      <LatestMovies />
    </div>
  </div>
</template>
