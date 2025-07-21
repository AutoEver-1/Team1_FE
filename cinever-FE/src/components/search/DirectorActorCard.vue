<template>
  <div
    @click="$emit('click', member)"
    class="flex flex-col items-center px-2 py-2 rounded-lg transition-all duration-300 overflow-hidden"
  >
    <!-- 이미지 (큰 원형) -->
    <div class="w-36 h-36 mb-3">
      <img
        :src="
          member.profilePath ? IMAGE_BASE_URL + member.profilePath : fallbackImg
        "
        class="w-full h-full object-cover rounded-full"
        alt="profile image"
      />
    </div>

    <!-- 텍스트 정보 -->
    <div class="text-center flex flex-col gap-1">
      <h2 class="text-base font-semibold text-white">{{ member.name }}</h2>
    </div>
  </div>
</template>

<script setup>
import fallbackImg from "../../assets/images/default_profile.png";
import { IMAGE_BASE_URL } from "../../utils/tmdbUrl";

const props = defineProps({
  member: {
    type: Object,
    required: true,
  },
});
</script>
