<script setup>
const props = defineProps({
  tabList: Object,
  selectedId: String,
});
const emit = defineEmits(["update:selectedId"]);
</script>

<template>
  <div class="flex border-b border-amber-400 text-sm gap-6 mt-6">
    <button
      v-for="tab in tabList"
      :key="tab.id"
      class="flex-1 pb-2 text-center"
      :class="
        selectedId == tab.id
          ? 'border-b-2 border-amber-400 font-semibold'
          : ' text-gray-400'
      "
      @click="emit('update:selectedId', tab.id)"
    >
      {{ tab.name }}
    </button>
  </div>
</template>
