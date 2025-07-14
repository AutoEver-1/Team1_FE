<template>
  <div class="w-[70%]">
    <div class="flex mt-24 w-full gap-3 items-center justify-center">
      <BaseInput
        v-model="keyword"
        placeholder="보고싶은 Reviewer를 검색해보세요"
        inputClass="w-[70%] border-yellow-400 bg-[#12100E] py-2 px-4 bg-opacity-70"
      />
      <BaseButton
        label="검색"
        class="w-[10%] bg-yellow-400 hover:bg-yellow-500 text-black"
        @click="console.log(keyword)"
      />
    </div>
  </div>
</template>

<script setup>
import BaseInput from "../common/BaseInput.vue";
import BaseButton from "../common/BaseButton.vue";
import { ref } from "vue";
const keyword = ref("");
</script>
