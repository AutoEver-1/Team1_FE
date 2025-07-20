<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  modelValue: String, // 검색 input의 값
  placeholder: { type: String, default: "검색어 입력" },
  icon: [Object], // 컴포넌트
  color: { type: String, default: "white" }, // 아이콘 색상
  hoverBg: { type: String, default: "bg-gray-800" }, // hover 배경색
  borderColor: { type: String, default: "border-2 border-white" }, // 아이콘 테두리 색상
});

const emit = defineEmits(["update:modelValue"]);

const route = useRoute(); // 현재 라우트 객체
const router = useRouter();
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
    if (props.modelValue?.trim()) {
      isOpen.value = true;
    } else {
      isOpen.value = false;
    }
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);

  if (props.modelValue?.trim()) {
    isOpen.value = true;
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// 페이지가 바뀌면 검색창 닫기
watch(
  () => route.fullPath,
  (newPath) => {
    if (!newPath.startsWith("/search")) {
      isOpen.value = false;
      // emit("update:modelValue", ""); // 값 초기화
    }
  }
);

// 닫힐 때 입력값 초기화
watch(isOpen, (newVal) => {
  if (!newVal) {
    emit("update:modelValue", "");
  }
});

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};

const handleEnter = (event) => {
  if (event.key === "Enter" && props.modelValue.trim()) {
    router.push({
      path: "/search",
      query: { keyword: props.modelValue.trim() }, // 쿼리 파라미터로 검색어 전달
    });
  }
};
</script>

<template>
  <div
    class="slide-search-input relative flex items-center select-none transition-all duration-300 overflow-hidden rounded-full cursor-pointer"
    :class="[
      isOpen
        ? ` w-60 md:w-72 px-2 border-2 border-amber-600`
        : 'w-9 bg-transparent',
    ]"
  >
    <!-- 돋보기 버튼 -->
    <div
      class="w-9 h-9 rounded-full flex items-center justify-center"
      :class="[hoverBg]"
      @click="toggleOpen"
    >
      <component :is="icon" class="w-5 h-5" :class="`text-${color}`" />
    </div>

    <!-- 돋보기와 입력창 사이 작은 구분선 -->
    <div v-if="isOpen" class="relative pl-4">
      <div
        class="absolute left-1 top-1/2 -translate-y-1/2 h-3 border-l border-amber-500"
      ></div>
    </div>

    <!-- 검색 input -->
    <input
      v-if="isOpen"
      ref="inputRef"
      type="text"
      :value="modelValue"
      @input="updateValue"
      @keydown.enter="handleEnter"
      :placeholder="placeholder"
      class="ml-1 w-5/6 bg-transparent text-sm font-light text-white placeholder-white/40 outline-none"
    />
  </div>
</template>
