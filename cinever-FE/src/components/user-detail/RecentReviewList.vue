<script setup>
import BaseRating from "../common/BaseRating.vue"; // 별점 표시 컴포넌트

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["click-like", "click-movie"]);

const handleLike = (review) => {
  emit("click-like", review);
};

const handleClick = (movieId) => {
  emit("click-movie", movieId);
};
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
    <div
      v-for="review in list"
      :key="review.id"
      class="relative flex flex-col h-full rounded-xl border border-white/10 bg-white/5 p-4 shadow-md hover:shadow-lg hover:bg-white/10 transition duration-300"
      @click="handleClick(review.movieId)"
    >
      <!-- 제목 -->
      <p class="text-white text-base font-semibold truncate mb-2">
        {{ review.title }}
      </p>

      <!-- 별점 -->
      <div class="flex items-center text-amber-400 mb-3">
        <BaseRating :score="review.rating" size="18" />
        <span class="ml-2 font-medium">{{ review.rating ?? "-" }}/5</span>
      </div>

      <!-- 내용 요약 -->
      <p class="text-sm text-white/80 leading-relaxed mb-4 line-clamp-3">
        {{ review.context }}
      </p>

      <!-- 하단: 이미지 + 좋아요 -->
      <div
        class="flex items-center justify-between mt-auto pt-2 border-t border-white/10"
      >
        <img
          :src="review.posterPath"
          alt="poster"
          class="w-10 h-14 rounded object-cover shadow"
        />
        <button
          class="flex items-center gap-1 text-xs text-white/60 transition hover:text-amber-400"
          @click.stop="handleLike(review)"
        >
          <!-- 하트 아이콘 -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-4 w-4"
          >
            <path
              fill-rule="evenodd"
              d="M12 21C12 21 3 15 3 8.25C3 5.765 5.015 3.75 7.5 3.75C9.344 3.75 10.9 4.84 11.641 6.38C12.383 4.84 13.939 3.75 15.783 3.75C18.268 3.75 20.283 5.765 20.283 8.25C20.283 15 12.283 21 12.283 21L12 21Z"
              clip-rule="evenodd"
            />
          </svg>
          {{ review.likeCount }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tailwind에서 line-clamp 사용하려면 plugin 설치 필요 */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
