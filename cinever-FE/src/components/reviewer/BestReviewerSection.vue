<script setup>
import BaseButton from "../common/BaseButton.vue";
import { getReviewerAll } from "../../../src/api/reviewerApi";
import { ref, onMounted } from "vue";
import BaseBadge from "../common/BaseBadge.vue";

onMounted(() => {
  reviewerAll();
});

const dataList = ref();
defineProps({
  dataList: Object,
});

const reviewerAll = async () => {
  const res = await getReviewerAll();
  dataList.value = res.data.reviewerList.content;
};

const sliderX = ref(0);
const cardWidth = 224;
const maxOffset = -((10 - 4) * cardWidth);

const scrollLeft = () => {
  sliderX.value = Math.min(sliderX.value + cardWidth, 0);
};

const scrollRight = () => {
  sliderX.value = Math.max(sliderX.value - cardWidth, maxOffset);
};
</script>

<template>
  <p class="text-left mb-5 text-[28px]">Best Reviewer</p>

  <div class="relative overflow-hidden group w-full mx-auto">
    <!-- 슬라이더 리스트 -->
    <div
      class="flex gap-4 transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(${sliderX}px)` }"
    >
      <div
        v-for="(data, i) in dataList"
        :key="'slider-card-' + i + 1"
        class="relative w-[210px] shrink-0 flex flex-col items-center p-3 rounded-[10px] border border-white/20 bg-white/10 backdrop-blur-md shadow-md hover:bg-white/15 hover:backdrop-blur-lg transition duration-300"
      >
        <img
          :src="`${data.profile_img_url}`"
          alt="profile_img"
          class="rounded w-[80%] h-auto mb-2"
        />
        <div class="flex">
          <RouterLink :to="`/user/${data.memberId}`">
            <p class="text-white text-sm font-semibold">
              {{ data.nickname }}
            </p>
          </RouterLink>
          <p
            class="w-fit text-xs text-black font-bold px-1 mt-1 ml-1 rounded bg-yellow-400"
          >
            {{ data.role }}
          </p>
        </div>
        <div class="flex py-2 ml-1">
          <BaseBadge :dataList="data.genre_preference" index="#" />
        </div>
        <div class="flex w-full text-sm justify-around">
          <p>❤️ {{ data.follower_cnt }}</p>
          <p>✏️ {{ data.review_count }}</p>
          <p>
            ⭐
            {{ data.review_avg ? Number(data.review_avg).toFixed(1) : "0.0" }}
          </p>
        </div>
        <div class="flex mt-3 gap-3">
          <RouterLink
            v-for="(movie, idx) in data.wishlist.slice(0, 3)"
            :key="movie.movieId || idx"
            :to="`/movie/${movie.movieId}`"
            class="rounded hover:opacity-80 transition"
          >
            <img
              :src="movie.poster_path"
              alt="wishlist_poster"
              class="w-12 h-18 rounded object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </RouterLink>
        </div>
        <!-- 랭킹 넘버 -->
        <div
          class="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold"
        >
          {{ i + 1 }}
        </div>
      </div>
    </div>

    <!-- 좌우 버튼에 클릭 이벤트만 연결 -->
    <BaseButton
      label="◀"
      @click="scrollLeft"
      btnClass="absolute h-full top-1/2 left-0 -translate-y-1/2 
                bg-black/50 text-white p-3 rounded-full 
                opacity-0 group-hover:opacity-100 transition"
    />
    <BaseButton
      label="▶"
      @click="scrollRight"
      btnClass="absolute h-full top-1/2 right-0 -translate-y-1/2 
                bg-black/50 text-white p-3 rounded-full 
                opacity-0 group-hover:opacity-100 transition"
    />
  </div>
</template>
