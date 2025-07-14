<script setup>
defineProps({
  label: String,
  icon: { String, default: "" },
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
    class="flex justify-center items-center"
  >
    <img
      v-if="icon"
      :src="icon"
      alt="logo"
      class="mr-2 w-4 h-4 object-contain"
    />
    {{ label }}
  </button>
</template>
