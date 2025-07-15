<script setup>
defineProps({
  title: String,
  content: String,
  backgroundColor: { type: String, default: "neutral-900" },
  contClass: String,
  titleClass: String,
  divClass: String,
});
</script>

<template>
  <div class="rounded-xl p-4 space-y-2" :class="'bg-' + backgroundColor">
    <div
      v-if="title"
      class="flex items-center gap-1 text-gray-400 text-lg font-medium"
      :class="divClass"
    >
      <slot name="icon"> </slot>
      <span :class="titleClass">{{ title }}</span>
    </div>
    <slot name="contents"> </slot>
    <p v-if="content" class="text-sm font-normal" :class="contClass">
      {{ content }}
    </p>
  </div>
</template>
