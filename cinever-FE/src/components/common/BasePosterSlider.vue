<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import BasePoster from "../common/BasePoster.vue";

const props = defineProps({
  dataList: {
    type: Array,
    default: () => [],
  },
});

const currentPage = ref(0);
const visibleCount = ref(6);
const cardWidth = 160;
const gap = 16;

const totalPages = computed(() =>
  Math.ceil(props.dataList.length / visibleCount.value)
);

const slideWidth = computed(() => visibleCount.value * (cardWidth + gap));

const translateX = computed(() => `-${currentPage.value * slideWidth.value}px`);

const handleNext = () => {
  if (currentPage.value < totalPages.value - 1) currentPage.value++;
  console.log("test");
};

const handlePrev = () => {
  if (currentPage.value > 0) currentPage.value--;
};
</script>

<template>
  <div
    class="relative w-full group overflow-visible flex justify-center items-center"
  >
    <button
      @click="handlePrev"
      :disabled="currentPage === 0"
      class="hidden lg:block absolute lg:left-[-60px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black transition group-hover:disabled:opacity-30 opacity-0 group-hover:opacity-100"
    >
      ◀
    </button>

    <div class="block lg:hidden overflow-x-auto w-[80vw]">
      <div class="flex gap-4 w-max px-1">
        <div
          v-for="item in dataList"
          :key="item.movieId"
          class="shrink-0 w-[160px]"
        >
          <BasePoster v-bind="item" :genre="item.genre" />
        </div>
      </div>
    </div>
    <div
      class="hidden lg:block overflow-hidden"
      :style="{ width: slideWidth + 'px' }"
    >
      <div
        class="flex gap-4 transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(${translateX})` }"
      >
        <div
          v-for="item in dataList"
          :key="item.movieId"
          class="relative shrink-0 w-[160px] overflow-visible"
        >
          <BasePoster v-bind="item" :genre="item.genre" />
        </div>
      </div>
    </div>

    <button
      @click="handleNext"
      :disabled="currentPage >= totalPages - 1"
      class="hidden lg:block absolute right-[-60px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black transition group-hover:disabled:opacity-30 opacity-0 group-hover:opacity-100"
    >
      ▶
    </button>
  </div>
</template>
