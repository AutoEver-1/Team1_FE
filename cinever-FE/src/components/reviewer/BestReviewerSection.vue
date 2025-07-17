<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { getReviewerAll } from "../../../src/api/reviewerApi";
import BaseBadge from "../common/BaseBadge.vue";

// 리뷰어 목록 데이터 로드
const dataList = ref([]);
onMounted(async () => {
  const res = await getReviewerAll();
  dataList.value = res.data.reviewerList.content;
});

// 슬라이더 상태 및 계산
const sliderX = ref(0);
const cardWidth = 224; // 카드 전체 너비 (px)
const visibleCount = 4; // 데스크탑에서 보일 카드 개수
const maxOffset = computed(() => {
  return dataList.value.length <= visibleCount
    ? 0
    : -((dataList.value.length - visibleCount) * cardWidth);
});

// 데스크탑 여부 감지
const isDesktop = ref(window.innerWidth >= 1024);
const updateSize = () => {
  isDesktop.value = window.innerWidth >= 1024;
};

onMounted(() => {
  window.addEventListener("resize", updateSize);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateSize);
});

// 이동 함수
const scrollLeft = () => {
  sliderX.value = Math.min(sliderX.value + cardWidth, 0);
};
const scrollRight = () => {
  sliderX.value = Math.max(sliderX.value - cardWidth, maxOffset.value);
};
</script>

<template>
  <!-- 섹션 제목 -->
  <p class="text-left mb-5 text-[28px]">Best Reviewer</p>

  <!-- 공통 컨테이너: 모바일은 가로 스크롤, 데스크탑은 버튼+슬라이더 -->
  <div class="relative w-full group flex items-center">
    <!-- 이전 버튼(데스크탑) -->
    <button
      @click="scrollLeft"
      :disabled="sliderX === 0"
      class="hidden lg:block absolute left-[-60px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black transition group-hover:disabled:opacity-30 opacity-0 group-hover:opacity-100"
    >
      ◀
    </button>

    <!-- 카드 리스트: 모바일은 overflow-x-auto, 데스크탑은 overflow-hidden -->
    <div class="overflow-x-auto lg:overflow-hidden w-full px-2 lg:px-0">
      <div
        class="flex gap-4 transition-transform duration-500 ease-in-out"
        :style="isDesktop ? { transform: `translateX(${sliderX}px)` } : {}"
      >
        <div
          v-for="(data, i) in dataList"
          :key="data.memberId"
          class="relative w-[210px] flex-shrink-0 flex flex-col items-center p-3 rounded-[10px] border border-white/20 bg-white/10 backdrop-blur-md shadow-md hover:bg-white/15 hover:backdrop-blur-lg transition duration-300"
        >
          <!-- 프로필 이미지 -->
          <img
            :src="data.profile_img_url"
            alt="profile"
            class="w-24 h-24 rounded-full object-cover my-4"
          />

          <!-- 닉네임, 역할 -->
          <div class="flex items-center">
            <RouterLink :to="`/user/${data.memberId}`">
              <p class="text-white text-sm font-semibold">
                {{ data.nickname }}
              </p>
            </RouterLink>
            <p
              class="w-fit text-xs text-black font-bold px-1 ml-1 rounded bg-yellow-400"
            >
              {{ data.role }}
            </p>
          </div>

          <!-- 장르 배지 -->
          <div class="flex py-2">
            <BaseBadge :dataList="data.genre_preference" index="#" />
          </div>

          <!-- 통계(팔로워, 리뷰, 평점) -->
          <div class="flex w-full text-sm justify-around">
            <p>❤️ {{ data.follower_cnt }}</p>
            <p>✏️ {{ data.review_count }}</p>
            <p>
              ⭐
              {{ data.review_avg ? Number(data.review_avg).toFixed(1) : "0.0" }}
            </p>
          </div>

          <!-- 위시리스트 영화 포스터 -->
          <div class="flex mt-3 gap-2">
            <RouterLink
              v-for="(movie, idx) in data.wishlist.slice(0, 3)"
              :key="movie.movieId || idx"
              :to="`/movie/${movie.movieId}`"
              class="rounded hover:opacity-80 transition"
            >
              <img
                :src="movie.poster_path"
                alt="wish"
                class="w-12 h-18 rounded object-cover"
              />
            </RouterLink>
          </div>

          <!-- 카드 번호 -->
          <div
            class="absolute top-2 left-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full text-center"
          >
            {{ i + 1 }}
          </div>
        </div>
      </div>
    </div>

    <!-- 다음 버튼(데스크탑) -->
    <button
      @click="scrollRight"
      :disabled="sliderX <= maxOffset"
      class="hidden lg:block absolute right-[-60px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
    >
      ▶
    </button>
  </div>
</template>
