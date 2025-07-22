<script setup>
import { ref, onMounted } from "vue";
import BaseRating from "../common/BaseRating.vue";
import { getUserReviewInfo } from "../../api/user";
import BaseProfileImage from "../common/BaseProfileImage.vue";
import { useRouter } from "vue-router";

const dataList = ref();
const router = useRouter();

onMounted(() => {
  getReviewById();
});

const toMovieDetail = (id) => {
  console.log(id);
  router.push("/movie/" + id);
};

const getReviewById = async () => {
  const res = await getUserReviewInfo(112);
  dataList.value = res.data.reviewList.slice().reverse();
  console.log("getReviewById", dataList);
};
</script>

<template>
  <div
    class="relative z-10 flex flex-col items-center justify-center text-white w-full"
  >
    <div class="max-w-7xl px-4 w-full">
      <p
        class="text-white text-md sm:text-2xl font-semibold md:font-bold mb-3 md:mb-6 text-left"
      >
        실시간 최신 리뷰
      </p>

      <div class="sm:hidden flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <div
          v-for="review in dataList?.slice(0, 6)"
          :key="review.movieId"
          class="min-w-[280px] max-w-[360px] shrink-0 rounded-2xl border border-white/15 p-4 shadow-lg backdrop-blur transition hover:scale-[1.02] hover:bg-white/10"
          @click="toMovieDetail(review.movieId)"
        >
          <div class="flex flex-col pb-2 border-b border-white/15">
            <div class="flex items-center gap-3">
              <BaseProfileImage size="40px" />

              <div>
                <p
                  class="flex items-center gap-2 text-sm font-semibold text-white"
                >
                  user
                  <span
                    class="w-fit text-xs font-bold text-black px-2 py-0.5 rounded bg-yellow-400"
                  >
                    role
                  </span>
                </p>
                <p class="text-[10px] text-white/60">preference</p>
              </div>
            </div>

            <div class="flex items-center text-amber-400 mt-2">
              <BaseRating :score="review.rating" size="20" />
              <span class="ml-2 text-[20px] font-medium">
                {{ review.rating ?? "-" }}
              </span>
              <span class="text-xs font-medium text-gray-200 opacity-50 mt-2">
                {{ review.rating ? "\u00A0/ 5.0" : "" }}
              </span>
            </div>
          </div>

          <div class="mt-4 flex gap-4">
            <img
              :src="review.posterPath"
              alt="poster"
              class="h-20 w-14 rounded object-cover shadow-sm"
            />
            <div>
              <p class="truncate text-sm font-medium text-white">
                {{ review.title }}
              </p>
              <p class="text-xs text-white/60 mt-1">
                {{ review.reviewdDate?.split("T")[0] }}
              </p>
              <p class="mt-1 pb-4 text-xs leading-relaxed text-white/90">
                {{ review.context?.slice(0, 55) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ✅ 데스크탑: 그리드 -->
      <div class="hidden sm:grid grid-cols-2 xl:grid-cols-3 gap-6">
        <div
          v-for="review in dataList?.slice(0, 6)"
          :key="review.id"
          class="rounded-2xl border border-white/15 p-4 shadow-lg backdrop-blur transition hover:scale-[1.02] hover:bg-white/10"
          @click="toMovieDetail(review.movieId)"
        >
          <!-- 유저 + 별점 -->
          <div
            class="flex flex-col pb-2 border-b border-white/15 sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="flex items-center gap-3">
              <BaseProfileImage size="40px" />

              <div>
                <p
                  class="flex items-center gap-2 text-sm font-semibold text-white sm:text-base"
                >
                  user
                  <span
                    class="w-fit text-xs font-bold text-black px-2 py-0.5 rounded bg-yellow-400"
                  >
                    role
                  </span>
                </p>
                <p class="text-[10px] text-white/60 sm:text-xs">preference</p>
              </div>
            </div>

            <div class="flex items-center text-amber-400">
              <BaseRating :score="review.rating" size="20" />
              <span class="ml-2 text-[20px] font-medium">
                {{ review.rating ?? "-" }}
              </span>
              <span class="text-xs font-medium text-gray-200 opacity-50 mt-2">
                {{ review.rating ? "\u00A0/ 5.0" : "" }}
              </span>
            </div>
          </div>

          <div class="mt-4 flex gap-4">
            <img
              :src="review.posterPath"
              alt="poster"
              class="h-20 w-14 rounded object-cover shadow-sm sm:h-24 sm:w-16"
            />
            <div>
              <p class="truncate text-sm font-medium text-white sm:text-base">
                {{ review.title }}
              </p>
              <p class="text-xs text-white/60 mt-1">
                {{ review.reviewdDate?.split("T")[0] }}
              </p>
              <p class="mt-2 text-xs leading-relaxed text-white/90">
                {{ review.context }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ✅ scrollbar 숨기기 */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
