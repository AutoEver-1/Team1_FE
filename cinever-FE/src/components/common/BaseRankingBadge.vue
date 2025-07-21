<script setup>
import { computed } from "vue";

const props = defineProps({
  rank: Number,
  size: {
    type: Number,
    default: 30,
  },
  color: {
    type: String,
    default: "red", // 기본 붉은색
  },
});

// 어떤 그라데이션을 쓸지 id 선택
const gradientId = computed(() => {
  return props.color === "gold" ? "goldBlackGradient" : "redBlackGradient";
});
</script>

<template>
  <svg
    viewBox="0 0 100 120"
    xmlns="http://www.w3.org/2000/svg"
    class="w-full h-full"
  >
    <defs>
      <!-- 빨간색 그라데이션 -->
      <linearGradient id="redBlackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="black" />
        <stop offset="40%" stop-color="#7f1d1d" />
        <stop offset="60%" stop-color="#b91c1c" />
        <stop offset="100%" stop-color="#ef4444" />
      </linearGradient>

      <!-- 금색 그라데이션 -->
      <linearGradient
        id="goldBlackGradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stop-color="rgba(255, 215, 0, 0.9)" />
        <stop offset="70%" stop-color="rgba(169, 113, 66, 0.9)" />
        <stop offset="100%" stop-color="rgba(92, 58, 0, 0.9)" />
      </linearGradient>
    </defs>

    <!-- 배경 -->
    <path d="M0,0 H100 V100 L50,120 L0,100 Z" :fill="`url(#${gradientId})`" />

    <!-- 텍스트 -->
    <text
      x="50%"
      y="58%"
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
