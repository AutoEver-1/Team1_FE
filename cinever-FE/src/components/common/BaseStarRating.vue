<template>
  <div
    class="flex items-center gap-0.5 cursor-pointer"
    @mouseleave="hoverValue = 0"
  >
    <div
      v-for="n in 5"
      :key="n"
      class="relative w-[28px] h-[28px]"
      @mousemove="onHover($event, n)"
      @click="onClick($event, n)"
    >
      <svg
        class="absolute top-0 left-0 z-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgb(253 197 0)"
        stroke-width="1"
        width="100%"
        height="100%"
      >
        <path
          d="M12 17.27L18.18 21 16.54 13.97
             22 9.24l-7.19-.61L12 2 9.19 8.63
             2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>

      <div
        class="absolute top-0 left-0 z-10 overflow-hidden"
        :style="{ width: `${getFillPercent(n)}%` }"
      >
        <svg viewBox="0 0 24 24" fill="rgb(253 197 0)" width="28" height="28">
          <path
            d="M12 17.27L18.18 21 16.54 13.97
               22 9.24l-7.19-.61L12 2 9.19 8.63
               2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
      </div>
    </div>
    <span class="ml-1 text-amber-500 text-lg">{{
      displayRating.toFixed(1)
    }}</span>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  modelValue: Number,
});
const emit = defineEmits(["update:modelValue"]);

const hoverValue = ref(0);
const currentValue = ref(props.modelValue ?? 0);

watch(
  () => props.modelValue,
  (val) => {
    currentValue.value = val;
  },
  { immediate: true }
);

const displayRating = computed(() => hoverValue.value || currentValue.value);

const getFillPercent = (starIndex) => {
  const value = displayRating.value;
  if (value >= starIndex) return 100;
  if (value + 1 <= starIndex) return 0;
  return (value - (starIndex - 1)) * 100;
};

const onHover = (event, starIndex) => {
  const box = event.currentTarget.getBoundingClientRect();
  const offset = event.clientX - box.left;
  const width = box.width;
  hoverValue.value = offset < width / 2 ? starIndex - 0.5 : starIndex;
};

const onClick = (event, starIndex) => {
  const box = event.currentTarget.getBoundingClientRect();
  const offset = event.clientX - box.left;
  const width = box.width;
  const selected = offset < width / 2 ? starIndex - 0.5 : starIndex;
  currentValue.value = selected;
  emit("update:modelValue", selected);
};
</script>
