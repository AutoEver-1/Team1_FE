<script setup>
import { ref } from "vue";
import BaseBackground from "../components/common/BaseBackground.vue";
</script>

<template>
  <BaseBackground>
    <div class="min-h-screen flex justify-center items-center">
      <router-view />
    </div>
  </BaseBackground>
</template>
