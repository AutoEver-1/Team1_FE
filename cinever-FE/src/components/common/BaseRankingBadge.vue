<script setup>
defineProps({
  rank: Number,
  color: {
    type: String,
    default: "text-red-600",
  },
  size: {
    type: Number,
    default: "30",
  },
});
</script>
<template>
  <svg
    viewBox="0 0 100 120"
    xmlns="http://www.w3.org/2000/svg"
    class="w-full h-full fill-current"
    :class="color"
  >
    <path d="M0,0 H100 V100 L50,120 L0,100 Z" />
    <text
      x="50%"
      y="60%"
      dominant-baseline="middle"
      text-anchor="middle"
      :font-size="size"
      fill="white"
      font-weight="bold"
    >
      {{ rank }}
    </text>
  </svg>
</template>
