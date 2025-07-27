<script setup>
import BaseRating from "../common/BaseRating.vue";
import { useRouter } from "vue-router";

defineProps({ reivewList: Object });

const router = useRouter();

const goToMoviePage = (movieId) => {
  router.push({ name: "MovieDetail", params: { id: movieId } });
};
</script>

<template>
  <div class="min-h-screen space-y-4 md:px-10">
    <p class="text-white">
      <span class="text-amber-500 text-xl font-semibold">
        {{ reivewList.totalReviewCount }}
      </span>
      건의 리뷰
    </p>
    <div class="flex w-full flex-col gap-6">
      <div
        v-for="review in reivewList.reviewList.slice().reverse()"
        :key="review.id"
        class="cursor-pointer relative w-full overflow-hidden rounded-2xl border border-white/15 p-4 shadow-lg backdrop-blur transition hover:scale-[1.02] hover:bg-white/10 sm:p-6"
        @click="goToMoviePage(review.movieId)"
      >
        <div class="mt-4 flex gap-4">
          <img
            :src="review.posterPath"
            alt="poster"
            class="h-20 w-14 rounded object-cover shadow-sm sm:h-24 sm:w-16"
          />
          <div class="w-full">
            <p
              class="truncate text-sm w-full font-medium text-white sm:text-base border-b border-white/15 pb-2"
            >
              {{ review.title }}
            </p>

            <div class="flex items-center text-amber-400">
              <BaseRating :score="review.rating" size="20" />
              <span class="ml-2 text-[20px] font-medium">
                {{ review.rating ?? "-" }}
              </span>
              <span class="text-xs font-medium text-gray-200 opacity-50 mt-2">
                {{ review.rating ? "\u00A0/ 5.0" : "" }}
              </span>
            </div>
            <p
              class="pb-4 text-xs leading-relaxed text-white/90 sm:text-sm mt-1"
            >
              {{ review.context }}
            </p>
          </div>
        </div>
        <div class="flex justify-end">
          <p class="text-xs text-white/60 mt-1">
            {{ review.reviewdDate?.split("T")[0] }}
          </p>
          <!-- <button
            class="flex items-center gap-1 text-xs text-white/60 transition hover:text-amber-400 sm:text-sm"
            @click="toggleLike(review)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-4 w-4 sm:h-5 sm:w-5"
            >
              <path
                fill-rule="evenodd"
                d="M12 21C12 21 3 15 3 8.25C3 5.765 5.015 3.75 7.5 3.75C9.344 3.75 10.9 4.84 11.641 6.38C12.383 4.84 13.939 3.75 15.783 3.75C18.268 3.75 20.283 5.765 20.283 8.25C20.283 15 12.283 21 12.283 21L12 21Z"
                clip-rule="evenodd"
              />
            </svg>
            {{ review.likeCount }}
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>
