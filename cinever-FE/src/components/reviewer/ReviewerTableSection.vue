<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { getReviewerAll } from "../../api/reviewerApi";
import BaseBadge from "../common/BaseBadge.vue";

// 상태 변수
const dataList = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);

const isMobile = ref(window.innerWidth < 640);
const observerEl = ref(null);
let observer = null;

// 페이지네이션 블록
const pageBlockSize = 5;
const pageBlockStart = ref(1);

// 모바일에서 현재까지 로드한 페이지 기록
const loadedPages = ref(new Set());

// reviewer 데이터 로드
const reviewerAll = async (page = 1, append = false) => {
  const res = await getReviewerAll(page);
  const content = res.data.reviewerList.content;
  totalPages.value = res.data.reviewerList.totalPages - 1;
  currentPage.value = page;

  // 모바일: 누적
  if (isMobile.value && append) {
    if (!loadedPages.value.has(page)) {
      dataList.value.push(...content);
      loadedPages.value.add(page);
    }
  } else {
    // 데스크탑: 현재 페이지만 교체
    dataList.value = content;
  }

  // 페이지 블록 조정 (데스크탑 한정)
  if (!isMobile.value) {
    if (page < pageBlockStart.value) {
      pageBlockStart.value = Math.max(1, page - pageBlockSize + 1);
    } else if (page >= pageBlockStart.value + pageBlockSize) {
      pageBlockStart.value = page;
    }
  }
};

// 옵저버 설정
const setupObserver = () => {
  if (observer) observer.disconnect();

  observer = new IntersectionObserver(async ([entry]) => {
    if (entry.isIntersecting && isMobile.value) {
      const nextPage = Math.floor(dataList.value.length / 10) + 1;
      if (nextPage <= totalPages.value && !loadedPages.value.has(nextPage)) {
        await reviewerAll(nextPage, true);
      }
    }
  });

  nextTick(() => {
    if (observerEl.value) observer.observe(observerEl.value);
  });
};

// 화면 크기 변경 시 처리
const handleResize = () => {
  const wasMobile = isMobile.value;
  isMobile.value = window.innerWidth < 640;

  if (wasMobile !== isMobile.value) {
    if (isMobile.value) {
      // 데스크탑 → 모바일
      const pagesToLoad = currentPage.value;
      loadedPages.value = new Set();
      dataList.value = [];

      const loadAllPages = async () => {
        for (let i = 1; i <= pagesToLoad; i++) {
          await reviewerAll(i, true);
        }

        // ✅ 렌더링 이후, 마지막 아이템 위치로 스크롤 이동
        await nextTick();
        const targetEl = document.querySelector(`[data-page-end]`);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "auto" }); // 또는 smooth
        }
      };

      loadAllPages();
    } else {
      // 모바일 → 데스크탑
      reviewerAll(currentPage.value);
    }

    setupObserver();
  }
};

// 페이지네이션 번호 목록
const visiblePages = computed(() => {
  const end = Math.min(
    pageBlockStart.value + pageBlockSize - 1,
    totalPages.value
  );
  return Array.from(
    { length: end - pageBlockStart.value + 1 },
    (_, i) => pageBlockStart.value + i
  );
});

// 페이지 블록 이동
const prevPageBlock = () => {
  if (pageBlockStart.value > 1) {
    pageBlockStart.value = Math.max(1, pageBlockStart.value - pageBlockSize);
  }
};
const nextPageBlock = () => {
  if (pageBlockStart.value + pageBlockSize <= totalPages.value) {
    pageBlockStart.value += pageBlockSize;
  }
};

// 초기 실행
onMounted(() => {
  reviewerAll(1);
  setupObserver();
  window.addEventListener("resize", handleResize);
});

// 클린업
onBeforeUnmount(() => {
  if (observer) observer.disconnect();
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <!-- 데스크탑용 테이블 -->
    <div class="w-full hidden sm:block">
      <table class="w-full text-left text-sm text-white">
        <thead
          class="uppercase text-yellow-400 border-b border-yellow-400 text-xs"
        >
          <tr>
            <th class="px-4 py-3">User name</th>
            <th class="px-4 py-3 text-center">Like</th>
            <th class="px-4 py-3 text-center">Reviews</th>
            <th class="px-4 py-3 text-center">Rating</th>
            <th class="px-4 py-3 text-center">Movie</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="data in dataList"
            :key="data.memberId"
            class="border-b border-[#FFD40063]"
          >
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <img
                  :src="data.profile_img_url"
                  alt="profile_img"
                  class="w-8 h-12 rounded object-cover"
                />
                <div class="flex flex-col">
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
                  <div class="flex py-2 gap-1">
                    <BaseBadge :dataList="data.genre_preference" index="#" />
                  </div>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 text-center">❤️ {{ data.follower_cnt }}</td>
            <td class="px-4 py-3 text-center">✏️ {{ data.review_count }}</td>
            <td class="px-4 py-3 text-center">
              ⭐
              {{ data.review_avg ? Number(data.review_avg).toFixed(1) : "0.0" }}
            </td>
            <td class="px-4 py-3 text-center">
              <div class="flex justify-center gap-3">
                <RouterLink
                  v-for="(movie, idx) in data.wishlist.slice(0, 3)"
                  :key="movie.movieId || idx"
                  :to="`/movie/${movie.movieId}`"
                >
                  <img
                    :src="movie.poster_path"
                    alt="wishlist_poster"
                    class="w-12 h-18 rounded object-cover transition-transform duration-300 hover:scale-150"
                  />
                </RouterLink>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 모바일용 카드 리스트 -->
    <div class="w-full sm:hidden space-y-4">
      <div
        v-for="(data, idx) in dataList"
        :key="'card-' + data.memberId"
        :data-page-end="idx === dataList.length - 1 ? true : null"
        class="w-full p-4 rounded-lg border border-yellow-400 text-white bg-white/5 backdrop-blur-sm"
      >
        <div class="flex items-center gap-3 mb-2">
          <img
            :src="data.profile_img_url"
            alt="profile_img"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div class="flex flex-col">
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
            <div class="flex py-2 gap-1">
              <BaseBadge :dataList="data.genre_preference" index="#" />
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <div class="text-xs">
            ❤️ {{ data.follower_cnt }} &nbsp; | &nbsp; ✏️
            {{ data.review_count }} &nbsp; | &nbsp; ⭐
            {{ data.review_avg ? Number(data.review_avg).toFixed(1) : "0.0" }}
          </div>
          <div class="flex mt-2 gap-2">
            <RouterLink
              v-for="(movie, idx) in data.wishlist.slice(0, 3)"
              :key="movie.movieId || idx"
              :to="`/movie/${movie.movieId}`"
            >
              <img
                :src="movie.poster_path"
                alt="wishlist_poster"
                class="w-12 h-18 rounded object-cover transition-transform duration-300 hover:scale-150"
              />
            </RouterLink>
          </div>
        </div>
      </div>
      <!-- 무한스크롤 감지 타겟 -->
      <div v-if="isMobile" ref="observerEl" class="h-4"></div>
    </div>

    <!-- 페이지네이션 -->
    <div v-if="!isMobile" class="flex flex-wrap gap-2 justify-center mt-6">
      <button
        @click="prevPageBlock"
        :disabled="pageBlockStart === 1"
        class="px-4 py-2 rounded bg-gray-500 text-white disabled:opacity-50"
      >
        Prev
      </button>

      <button
        v-for="n in visiblePages"
        :key="n"
        @click="reviewerAll(n)"
        :class="[
          'px-4 py-2 rounded',
          n === currentPage
            ? 'bg-yellow-500 text-black font-bold'
            : 'bg-yellow-400 hover:bg-yellow-500 text-black',
        ]"
      >
        {{ n }}
      </button>

      <button
        @click="nextPageBlock"
        :disabled="pageBlockStart + pageBlockSize > totalPages"
        class="px-4 py-2 rounded bg-gray-500 text-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>
