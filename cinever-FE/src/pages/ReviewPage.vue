<template>
  <BaseBackground>
    <div class="w-full flex flex-col items-center mt-16">
      <!-- <div class="w-[90%] max-w-4xl flex mt-16 gap-3 items-center justify-center">
      <ReviewerSearchSection />
    </div> -->
      <div class="max-w-6xl w-[80%] mt-14 mb-20 relative hidden lg:block">
        <BestReviewerSection />
      </div>
      <div class="w-[90%] max-w-4xl mb-20 overflow-x-auto hidden lg:block">
        <ReviewerTableSection />
      </div>
      <div class="w-[90%] mb-20 overflow-x-auto block lg:hidden">
        <MobileReviewerSection />
      </div>
    </div>
  </BaseBackground>
</template>

<script setup>
import ReviewerSearchSection from "../components/reviewer/ReviewerSearchSection.vue";
import BestReviewerSection from "../components/reviewer/BestReviewerSection.vue";
import ReviewerTableSection from "../components/reviewer/ReviewerTableSection.vue";
import BaseBackground from "../components/common/BaseBackground.vue";
import MobileReviewerSection from "../components/reviewer/MobileReviewerSection.vue"; // 새로 만들기
</script>
