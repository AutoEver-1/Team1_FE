<script setup>
import BaseRating from "./BaseRating.vue";

defineProps({
  starColor: {
    type: String,
    default: "text-red-500",
  },
  rating: String,
  avatar: String,
  content: String,
  nickname: String,
});
</script>

<template>
  <div class="flex gap-4 bg-[#1e1c1a] p-4 rounded-xl text-white">
    <img
      class="w-12 h-12 rounded-full object-cover"
      :src="avatar"
      alt="user avatar"
    />
    <div class="flex-1 space-y-2">
      <p class="text-gray-400">{{ nickname }}</p>
      <div class="bg-black rounded-lg p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="flex">
            <BaseRating :score="rating" />
          </div>
          <span class="font-semibold text-amber-500">{{
            rating ? rating : "-"
          }}</span>
          <span class="font-thin text-gray-400 text-xs mt-1">/ 5.0</span>
        </div>
        <p class="text-sm leading-snug whitespace-pre-wrap">
          {{ content }}
        </p>
        <div class="mt-2 flex justify-end text-white/60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5S12 5.765 12 8.25c0-2.485-2.015-4.5-4.5-4.5S3 5.765 3 8.25c0 5.25 9 11.25 9 11.25s9-6 9-11.25z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
