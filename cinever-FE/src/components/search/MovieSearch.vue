<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";

const props = defineProps({
  modelValue: String, // 검색 input의 값
  placeholder: { type: String, default: "검색어 입력" },
  icon: [Object], // 컴포넌트
  color: { type: String, default: "white" }, // 아이콘 색상
  hoverBg: { type: String, default: "bg-gray-800" }, // hover 배경색
  borderColor: { type: String, default: "border-2 border-white" }, // 아이콘 테두리 색상
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const inputRef = ref(null);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    // 열리면 input에 포커스 주기
    nextTick(() => inputRef.value?.focus());
  }
};

// 외부 클릭 시 닫기 처리
const handleClickOutside = (event) => {
  if (!event.target.closest(".slide-search-input")) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};

watch(isOpen, (newVal) => {
  if (!newVal) {
    emit("update:modelValue", ""); // 닫히면 입력값 빈 문자열로 초기화
  }
});
</script>

<template>
  <div
    class="slide-search-input relative flex items-center select-none transition-all duration-300 overflow-hidden rounded-full cursor-pointer"
    :class="[
      isOpen
        ? `w-80 px-2 py-0.5 border-2 border-amber-600`
        : 'w-10 p-1 bg-transparent',
    ]"
  >
    <!-- 버튼은 절대 위치로 고정 -->
    <div
      class="w-8 h-8 rounded-full flex items-center justify-center"
      :class="[hoverBg]"
      @click="toggleOpen"
    >
      <component :is="icon" class="w-5 h-5" :class="`text-${color}`" />
    </div>

    <!-- 검색 input -->
    <input
      v-if="isOpen"
      ref="inputRef"
      type="text"
      :value="modelValue"
      @input="updateValue"
      :placeholder="placeholder"
      class="ml-2 w-5/6 bg-transparent text-sm font-medium text-white placeholder-white/50 outline-none"
    />
  </div>
</template>
