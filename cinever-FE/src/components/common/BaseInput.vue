<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: String,
  placeholder: { type: String, default: "검색어를 입력하세요" },
  inputClass: { type: String, default: "border-amber-400 bg-[#12100E]" },
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <div :class="['flex items-center border rounded-full', inputClass]">
    <span class="mr-2 text-amber-400 text-xl">🔍</span>
    <input
      type="text"
      :placeholder="placeholder"
      v-model="inputValue"
      class="bg-transparent w-full outline-none text-sm text-white placeholder:text-gray-300"
    />
  </div>
</template>
