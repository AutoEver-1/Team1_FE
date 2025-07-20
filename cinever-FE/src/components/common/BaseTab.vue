<script setup>
const props = defineProps({
  tabList: Object,
  selectedId: String,
  isFlex: {
    type: String,
    default: "flex-1",
  },
});
const emit = defineEmits(["update:selectedId"]);
</script>

<template>
  <div class="flex border-b border-amber-400 text-sm gap-6 mt-6">
    <button
      v-for="tab in tabList"
      :key="tab.id"
      class="pb-2 text-center px-2"
      :class="
        (isFlex,
        selectedId == tab.id
          ? 'border-b-2 border-amber-400 font-semibold'
          : ' text-gray-400')
      "
      @click="emit('update:selectedId', tab.id)"
    >
      {{ tab.name }}
    </button>
  </div>
</template>
