<template>
  <div
    class="flex flex-col items-center mt-16 bg-[url('/src/assets/images/backgroundImg.png')] bg-cover bg-top"
  >
    <div class="w-[90%] max-w-4xl flex mt-16 gap-3 items-center justify-center">
      <ReviewerSearchSection />
    </div>
    <div class="w-[90%] max-w-4xl mt-14 mb-20 relative">
      <BestReviewerSection />
    </div>
    <div class="w-[90%] max-w-4xl mb-20 overflow-x-auto">
      <ReviewerTableSection />
    </div>
  </div>
</template>

<script setup>
import ReviewerSearchSection from "../components/reviewer/ReviewerSearchSection.vue";
import BestReviewerSection from "../components/reviewer/BestReviewerSection.vue";
import ReviewerTableSection from "../components/reviewer/ReviewerTableSection.vue";
</script>
