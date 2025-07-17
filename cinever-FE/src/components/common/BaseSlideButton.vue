<!-- components/common/SlideButton.vue -->
<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  label: String, // 나타날 라벨
  icon: [Object, String], // 컴포넌트 또는 이미지 URL
  color: { type: String, default: "white" }, // ex: "blue-500", "red-500", "white"
  onClick: Function, // 클릭 핸들러
  isSearch: { type: Boolean, default: false }, // 검색 모드 여부
  modelValue: String, // 검색 input의 값
});

const isSliderOpen = ref(false);

const handleClick = () => {
  if (props.onClick) props.onClick();
};

const isImage = computed(() => {
  typeof props.icon === "string";
});

const hoverBg = computed(() =>
  props.color === "white" ? "hover:bg-gray-800" : `hover:bg-${props.color}/20`
);

const borderColor = computed(() =>
  props.color === "white"
    ? "border border-white"
    : `border border-${props.color}`
);

const iconColor = computed(() =>
  props.color === "white" ? "text-white" : `text-${props.color}`
);
</script>

<template>
  <div
    class="relative select-none"
    @mouseenter="isSliderOpen = true"
    @mouseleave="isSliderOpen = false"
    @click="handleClick"
  >
    <div
      class="flex justify-center items-center px-1 hover:px-2 hover:pr-3 py-1 rounded-full transition cursor-pointer"
      :class="hoverBg"
    >
      <!-- 아이콘 영역 -->
      <div
        class="w-8 h-8 rounded-full overflow-hidden flex justify-center items-center"
        :class="borderColor"
      >
        <!-- 1) 유저 이미지  -->
        <img
          v-if="isImage"
          :src="icon"
          class="w-5 h-5 object-cover"
          alt="profile"
        />
        <!-- 2) 아이콘  -->
        <component v-else :is="icon" class="w-5 h-5" :class="iconColor" " />
      </div>

      <!-- 라벨 -->
      <span
        :class="[
          ' text-sm font-medium whitespace-nowrap transition-all duration-300 overflow-hidden',
          isSliderOpen
            ? 'ml-2 max-w-[200px] opacity-100 text-white'
            : 'ml-0 max-w-0 opacity-0',
        ]"
      >
        {{ isSliderOpen ? label : "" }}
      </span>
    </div>
  </div>
</template>
