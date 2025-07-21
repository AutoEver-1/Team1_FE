<script setup>
import { ref, onMounted } from "vue";
import { getReviewerAll } from "../../../src/api/reviewerApi";
import BaseRankingBadge from "../common/BaseRankingBadge.vue";
import {
  HeartIcon,
  StarIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/vue/24/solid";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Mousewheel } from "swiper/modules";
import { getReviewerRoleMeta } from "../../utils/reviewerRole";

const dataList = ref([]);
const swiperInstance = ref(null);
const handlePrev = () => {
  swiperInstance.value?.slidePrev();
};
const handleNext = () => {
  swiperInstance.value?.slideNext();
};

onMounted(async () => {
  const res = await getReviewerAll();
  dataList.value = res.data.reviewerList.content;
});
</script>

<template>
  <div class="relative w-full">
    <Swiper
      @swiper="(swiper) => (swiperInstance = swiper)"
      :modules="[Navigation, Mousewheel]"
      :space-between="10"
      :slides-per-view="1.2"
      :breakpoints="{
        1024: { slidesPerView: 3.2 },
        1280: { slidesPerView: 5 },
      }"
      class="w-full"
    >
      <SwiperSlide
        v-for="(data, i) in dataList"
        :key="data.memberId"
        class="group py-2"
      >
        <RouterLink :to="'/user/' + data.memberId">
          <div
            :class="[
              'relative backdrop-blur-xl backdrop-saturate-150 rounded-xl overflow-hidden transition duration-300 h-[320px] w-[218px]',
              getReviewerRoleMeta(data.role).roleClass,
            ]"
          >
            <div class="absolute -top-1 left-2 px-1 py-0.5 z-10 w-10">
              <BaseRankingBadge :rank="i + 1" size="44" color="gold" />
            </div>

            <div
              class="flex flex-col items-center justify-center transition-all duration-300 h-[320px] group-hover:h-[120px]"
            >
              <img
                :src="data.profile_img_url"
                alt="profile"
                class="transition-all duration-300 w-32 h-32 rounded-full object-cover group-hover:w-14 group-hover:h-14 mt-6"
              />

              <div
                class="mt-2 flex flex-col items-center justify-center gap-2 group-hover:flex-row group-hover:gap-2"
              >
                <p
                  class="text-lg font-semibold text-center group-hover:text-sm"
                >
                  {{ data.nickname }}
                </p>
                <!-- <span
                  class="inline-block text-sm font-bold bg-amber-500 text-black px-2 py-0.5 rounded group-hover:text-[10px] group-hover:h-5 group-hover:py-0"
                >
                  {{ data.role }}
                </span> -->
                <div
                  class="w-fit px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-md backdrop-saturate-150 shadow-sm"
                  :class="getReviewerRoleMeta(data.role).badgeClass"
                >
                  {{ getReviewerRoleMeta(data.role).roleName }}
                </div>
              </div>
            </div>

            <div
              class="transition-all duration-300 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[500px] overflow-hidden px-2"
            >
              <div class="flex flex-wrap gap-2 mt-3 justify-center">
                <span
                  v-for="genre in data.genre_preference"
                  :key="genre"
                  class="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white"
                >
                  #{{ genre }}
                </span>
              </div>

              <div
                class="flex justify-around text-sm text-gray-300 mt-4 mb-2 px-5"
              >
                <div class="flex flex-col items-center">
                  <HeartIcon class="w-4 h-4 text-red-400 mb-1" />
                  <span>{{ data.follower_cnt }}</span>
                </div>
                <div class="flex flex-col items-center">
                  <ChatBubbleLeftEllipsisIcon
                    class="w-4 h-4 text-slate-200 mb-1"
                  />
                  <span>{{ data.review_count }}</span>
                </div>
                <div class="flex flex-col items-center">
                  <StarIcon class="w-4 h-4 text-amber-400 mb-1" />
                  <span>{{ data.review_avg?.toFixed(1) || "0.0" }}</span>
                </div>
              </div>

              <div class="flex gap-2 justify-center mt-2">
                <RouterLink
                  v-for="(movie, idx) in data.wishlist?.slice(0, 3) || []"
                  :key="movie.movieId || idx"
                  :to="`/movie/${movie.movieId}`"
                  class="relative"
                >
                  <img
                    :src="movie.poster_path"
                    alt="wish"
                    class="w-14 h-20 rounded object-cover hover:opacity-90 transition"
                  />
                </RouterLink>
              </div>
            </div>
          </div>
        </RouterLink>
      </SwiperSlide>
    </Swiper>

    <button
      @click="handlePrev"
      class="custom-swiper-prev hidden lg:block absolute left-[-60px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black transition"
    >
      ◀
    </button>

    <button
      @click="handleNext"
      class="custom-swiper-next hidden lg:block absolute right-[-60px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black transition"
    >
      ▶
    </button>
  </div>
</template>

<style scoped>
.swiper-slide {
  filter: none !important;
  opacity: 1 !important;
  transform: none !important;
}
.swiper-slide-active > div {
  transform: scale(1.05);
  z-index: 10;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.group:hover > div {
  transform: translateY(-4px);
  transition: all 0.3s ease;
}
</style>
