<script setup>
import backgroundImg from "../../assets/images/backgroundImg.png";
</script>

<template>
  <div class="relative bg-cover bg-top" :class="`bg-[url('${backgroundImg}')]`">
    <!-- 어두운 오버레이 -->
    <div class="absolute w-full h-full bg-black/30 z-0"></div>

    <slot />
  </div>
</template>
