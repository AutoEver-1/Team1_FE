<script setup>
defineProps({ dataList: Object, index: String });
</script>
<template>
  <span
    v-for="(data, i) in dataList"
    :key="i"
    class="bg-gray-700 text-white text-xs px-2 py-0.5 rounded-sm mr-1"
  >
    {{ index + data }}
  </span>
</template>
