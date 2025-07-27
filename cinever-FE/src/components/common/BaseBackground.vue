<script setup>
import backgroundImg from "../../assets/images/backgroundImg.png";
</script>

<template>
  <div
    class="relative bg-cover bg-top"
    :style="{ backgroundImage: `url(${backgroundImg})` }"
  >
    <!-- 어두운 오버레이 -->
    <div class="absolute w-full h-full bg-black/30 z-0"></div>

    <!-- 슬롯 콘텐츠 (위로 오도록 z-10) -->
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>
