<!-- components/common/BaseProfileImage.vue -->
<script setup>
import { ref, watch } from "vue";
import DefaultProfile from "../../assets/images/default_profile.png";

const props = defineProps({
  src: String,
  alt: {
    type: String,
    default: "profile image",
  },
  size: {
    type: String,
    default: "40px", // 기본 크기
  },
  rounded: {
    type: Boolean,
    default: true,
  },
});

const imgSrc = ref(props.src || DefaultProfile);

// props가 바뀌면 다시 시도
watch(
  () => props.src,
  (newVal) => {
    imgSrc.value = newVal || DefaultProfile;
  }
);

const onError = () => {
  imgSrc.value = DefaultProfile;
};
</script>

<template>
  <img
    :src="imgSrc"
    :alt="alt"
    :class="['object-cover', rounded ? 'rounded-full' : 'rounded']"
    :style="{ width: size, height: size }"
    @error="onError"
  />
</template>
