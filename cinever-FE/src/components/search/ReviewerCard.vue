<script setup>
import fallbackImg from "../../assets/images/logo.png";
import {
  HeartIcon,
  ChatBubbleLeftEllipsisIcon,
  StarIcon,
} from "@heroicons/vue/24/solid";

const props = defineProps({
  reviewer: {
    type: Object,
    required: true,
  },
});

// reviewer.role에 따른 스타일 클래스 매핑
const roleClassMap = {
  USER: "bg-gradient-to-br from-yellow-300/20 via-yellow-100/10 to-yellow-300/0 border-yellow-400/20 hover:border-yellow-300 hover:shadow-[0_0_10px_rgba(255,215,0,0.3)]",
  CRITIC:
    "bg-gradient-to-br from-cyan-300/60 via-cyan-500/20 to-cyan-400/0 border-cyan-400/20 shadow-[0_0_5px_rgba(0,255,255,0.3)] hover:border-cyan-300 hover:shadow-[0_0_10px_rgba(0,255,255,0.3)]",
  INFLUENCER:
    "bg-gradient-to-br from-red-700/90 via-red-500/20 to-red-500/0 border-red-400/20 shadow-[0_0_10px_rgba(255,0,0,0.3)] hover:border-red-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.3)]",
};

// role별 배지 색상 클래스
const badgeClassMap = {
  USER: "bg-yellow-400/30 text-yellow-100 border-yellow-200/10 shadow-yellow-100/20",
  CRITIC: "bg-cyan-400/40 text-cyan-100 border-cyan-200/20 shadow-cyan-100/20",
  INFLUENCER: "bg-red-600/40 text-red-100 border-red-200/20 shadow-red-100/20",
};

// reviewer.role에 맞는 한글 텍스트 매핑
const roleNameMap = {
  USER: "리뷰어",
  CRITIC: "비평가",
  INFLUENCER: "인플루언서",
};

// 배경 클래스 지정
const currentRoleClass =
  roleClassMap[props.reviewer.role] || roleClassMap[USER]; // 기본값

// 역할 지정
const roleLabel = roleNameMap[props.reviewer.role] || "리뷰어";

// 역할 한글 텍스트 배경 클래스 지정
const badgeClass = badgeClassMap[props.reviewer.role] || badgeClassMap.USER;
</script>

<template>
  <div
    @click="$emit('click', reviewer)"
    :class="[
      'flex flex-col min-w-[200px] items-center px-3 py-4 border-3 backdrop-blur-xl backdrop-saturate-150 shadow-lg rounded-2xl cursor-pointer overflow-x-hidden-hidden transition-all duration-300 hover:scale-105',
      currentRoleClass,
    ]"
  >
    <!-- 이미지 (큰 원형) -->
    <div class="w-36 h-36 mb-3">
      <img
        :src="reviewer.profile_img_url || fallbackImg"
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
        {{ roleLabel }}
      </div>

      <!-- 리뷰어 닉네임 -->
      <h2 class="text-lg font-semibold">{{ reviewer.nickname }}</h2>

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
