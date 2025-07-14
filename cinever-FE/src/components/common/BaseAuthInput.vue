<template>
  <div>
    <label :for="id" class="block mb-1 text-xs text-white/90">{{
      label
    }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      v-model="model"
      class="w-full p-1.5 pl-2 rounded text-xs placeholder:text-xs placeholder:text-white/50 text-white/95 bg-amber-900/50 border border-white/40 focus:outline-none focus:ring-1 focus:ring-amber-500"
      autocomplete="off"
    />
  </div>
</template>

<script setup>
const model = defineModel();

const props = defineProps({
  label: String,
  id: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
});
</script>
