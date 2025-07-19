<template>
  <BaseBackground>
    <div class="w-full flex flex-col items-center">
      <div class="w-[90%] max-w-4xl mt-14 mb-20 relative">
        <BestReviewerSection />
      </div>
      <div class="w-[90%] max-w-4xl mb-20 overflow-x-auto">
        <ReviewerTableSection />
      </div>
    </div>
  </BaseBackground>
</template>

<script setup>
import ReviewerSearchSection from "../components/reviewer/ReviewerSearchSection.vue";
import BestReviewerSection from "../components/reviewer/BestReviewerSection.vue";
import ReviewerTableSection from "../components/reviewer/ReviewerTableSection.vue";
import BaseBackground from "../components/common/BaseBackground.vue";
</script>
