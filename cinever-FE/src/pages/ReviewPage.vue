<template>
  <div
    class="flex flex-col items-center mt-16 bg-[url('/src/assets/images/backgroundImg.png')] bg-cover bg-center"
  >
    <div class="w-[90%] max-w-4xl flex mt-16 gap-3 items-center justify-center">
      <ReviewerSearchSection />
    </div>
    <div class="w-[90%] max-w-4xl mt-14 mb-20 relative">
      <BestReviewerSection />
    </div>
    <div class="w-[90%] max-w-4xl overflow-x-auto">
      <ReviewerTableSection />
    </div>
  </div>
</template>

<script setup>
import ReviewerSearchSection from "../components/reviewer/ReviewerSearchSection.vue";
import BestReviewerSection from "../components/reviewer/BestReviewerSection.vue";
import ReviewerTableSection from "../components/reviewer/ReviewerTableSection.vue";

import { ref } from "vue";

const sliderRef = ref(null);

const scrollLeft = () => {
  sliderRef.value?.scrollBy({ left: -680, behavior: "smooth" });
};
const scrollRight = () => {
  sliderRef.value?.scrollBy({ left: 680, behavior: "smooth" });
};
</script>

<style scoped>
/* ✅ 스크롤바 숨김 유틸 */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE & Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
