<script setup>
defineProps({
  label: String,
  btnClass: {
    type: String,
    default: "bg-amber-400 hover:bg-amber-500 text-black",
  },
});
defineEmits(["click"]);
</script>

<template>
  <button
    :class="['font-semibold rounded-md py-2 px-4', btnClass]"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>
