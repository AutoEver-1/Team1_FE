<template>
  <BaseInput
    v-model="keyword"
    placeholder="보고싶은 Reviewer를 검색해보세요"
    inputClass="w-full border-yellow-400 bg-[#12100E] py-2 px-4 bg-opacity-70"
  />
  <BaseButton
    label="검색"
    class="w-[10%] text-sm max-w-xs min-w-[60px] bg-yellow-400 hover:bg-yellow-500 text-black"
    @click="console.log(keyword)"
  />
</template>

<script setup>
import BaseInput from "../common/BaseInput.vue";
import BaseButton from "../common/BaseButton.vue";
import { ref } from "vue";
const keyword = ref("");
</script>
