<script setup>
import { ref, watch, onMounted, nextTick } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "내용을 입력하세요...",
  },
  minRows: {
    type: Number,
    default: 2,
  },
  maxRows: {
    type: Number,
    default: 10,
  },
});

const emit = defineEmits(["update:modelValue"]);
const textareaRef = ref(null);

const lineHeight = 25;

const resize = () => {
  const el = textareaRef.value;
  if (!el) return;

  el.style.height = "auto";

  const scrollHeight = el.scrollHeight;
  const maxHeight = props.maxRows * lineHeight;
  const minHeight = props.minRows * lineHeight;

  el.style.overflowY = scrollHeight > maxHeight ? "auto" : "hidden";
  el.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
  el.style.minHeight = `${minHeight}px`;
};

onMounted(() => nextTick(resize));
watch(
  () => props.modelValue,
  () => nextTick(resize)
);
</script>

<template>
  <textarea
    ref="textareaRef"
    :value="modelValue"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', $event.target.value)"
    class="w-full bg-zinc-900 text-white text-sm p-3 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-400 transition resize-none"
    style="line-height: 24px"
  />
</template>
