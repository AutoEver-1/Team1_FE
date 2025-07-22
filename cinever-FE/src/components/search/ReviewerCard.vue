<script setup>
import fallbackImg from "../../assets/images/default_profile.png";
import {
  HeartIcon,
  ChatBubbleLeftEllipsisIcon,
  StarIcon,
} from "@heroicons/vue/24/solid";
import { getReviewerRoleMeta } from "../../utils/reviewerRole";

const props = defineProps({
  reviewer: {
    type: Object,
    required: true,
  },
});

const { roleClass, badgeClass, roleName } = getReviewerRoleMeta(
  props.reviewer.role
);
</script>

<template>
  <div
    @click="$emit('click', reviewer)"
    :class="[
      'flex flex-col min-w-[200px] items-center px-3 py-4 border-3 backdrop-blur-xl backdrop-saturate-150 rounded-2xl cursor-pointer overflow-x-hidden-hidden transition-all duration-300 hover:scale-105',
      roleClass,
    ]"
  >
    <!-- 이미지 (큰 원형) -->
    <div class="md:w-36 md:h-36 w-20 h-20 mb-3">
      <img
        :src="
          reviewer.profile_img_url && reviewer.profile_img_url !== '1'
            ? reviewer.profile_img_url
            : fallbackImg
        "
        class="w-full h-full object-cover rounded-full"
      />
    </div>

    <!-- 리뷰어 정보 -->
    <div class="flex flex-col items-center gap-2 text-white text-sm">
      <!-- 리뷰어 역할 라벨 -->
      <div
        class="w-fit flex gap-1 px-3 py-1 text-xs font-semibold rounded-full border backdrop-bl ur-md backdrop-saturate-150 shadow-sm"
        :class="badgeClass"
      >
        {{ roleName }}
      </div>

      <!-- 리뷰어 닉네임 -->
      <h2
        class="text-lg font-semibold truncate w-full max-w-[180px] text-center"
        title="reviewer.nickname"
      >
        {{ reviewer.nickname }}
      </h2>
      <!-- 하단 리뷰어 정보(팔로워 수, 리뷰 수, 평균 평점) -->
      <div class="mt-1 flex gap-3 text-xs text-white/60">
        <div class="flex flex-col gap-1 items-center justify-center">
          <HeartIcon class="w-5 h-5" />
          <span class="pr-0.5">{{ reviewer.follower_cnt }}</span>
        </div>

        <div
          class="relative flex flex-col items-center gap-1 px-1 pl-4 before:content-[''] before:absolute before:h-4 before:border-l before:border-white/20 before:left-0 before:top-1/2 before:-translate-y-1/2"
        >
          <div class="flex flex-col gap-1 items-center justify-center">
            <ChatBubbleLeftEllipsisIcon class="w-5 h-5" />
            <span>{{ reviewer.review_count }}</span>
          </div>
        </div>

        <div
          class="relative flex items-center gap-1 pl-3 before:content-[''] before:absolute before:h-4 before:border-l before:border-white/20 before:left-0 before:top-1/2 before:-translate-y-1/2"
        >
          <div class="flex flex-col gap-1 items-center justify-center">
            <StarIcon class="w-5 h-5" />
            <span class="">{{
              reviewer.review_avg
                ? Number(reviewer.review_avg).toFixed(1)
                : "0.0"
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
