<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import BaseBackground from "../components/common/BaseBackground.vue";
import BaseRating from "../components/common/BaseRating.vue";

// 리뷰 데이터
const allReviews = [
  {
    id: 1,
    date: "2025-07-15",
    user: {
      nickname: "아트하우스L",
      role: "배우",
      preference: "멜로 · 로드무비",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    movie: {
      title: "라라랜드",
      genre: "뮤지컬 · 로맨스",
      avgScore: 4.6,
      poster:
        "https://image.tmdb.org/t/p/w185_and_h278_bestv2/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    },
    myScore: 4.5,
    likeCount: 45,
    content: "재즈와 사랑, 그 아름답고도 씁쓸한 교차점.",
  },
  {
    id: 1,
    date: "2025-07-15",
    user: {
      nickname: "아트하우스L",
      role: "배우",
      preference: "멜로 · 로드무비",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    movie: {
      title: "라라랜드",
      genre: "뮤지컬 · 로맨스",
      avgScore: 4.6,
      poster:
        "https://image.tmdb.org/t/p/w185_and_h278_bestv2/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    },
    myScore: 4.5,
    likeCount: 45,
    content: "재즈와 사랑, 그 아름답고도 씁쓸한 교차점.",
  },
  {
    id: 2,
    date: "2025-07-14",
    user: {
      nickname: "무비덕후",
      role: "관객",
      preference: "스릴러 · SF",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    movie: {
      title: "인터스텔라",
      genre: "SF",
      avgScore: 4.5,
      poster:
        "https://image.tmdb.org/t/p/w185_and_h278_bestv2/8nO6UVikWSXVjRMzYbQV4MbEJyB.jpg",
    },
    myScore: 5,
    likeCount: 12,
    content:
      "블랙홀·상대성이론·부녀愛까지 완벽한 우주 가족영화. 쿠퍼의 “STAY” 장면은 몇 번을 봐도 눈물을 자아낸다.",
  },
  {
    id: 2,
    date: "2025-06-14",
    user: {
      nickname: "무비덕후",
      role: "관객",
      preference: "스릴러 · SF",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    movie: {
      title: "인터스텔라",
      genre: "SF",
      avgScore: 4.5,
      poster:
        "https://image.tmdb.org/t/p/w185_and_h278_bestv2/8nO6UVikWSXVjRMzYbQV4MbEJyB.jpg",
    },
    myScore: 5,
    likeCount: 12,
    content:
      "블랙홀·상대성이론·부녀愛까지 완벽한 우주 가족영화. 쿠퍼의 “STAY” 장면은 몇 번을 봐도 눈물을 자아낸다.",
  },
  {
    id: 2,
    date: "2025-05-14",
    user: {
      nickname: "무비덕후",
      role: "관객",
      preference: "스릴러 · SF",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    movie: {
      title: "인터스텔라",
      genre: "SF",
      avgScore: 4.5,
      poster:
        "https://image.tmdb.org/t/p/w185_and_h278_bestv2/8nO6UVikWSXVjRMzYbQV4MbEJyB.jpg",
    },
    myScore: 5,
    likeCount: 12,
    content:
      "블랙홀·상대성이론·부녀愛까지 완벽한 우주 가족영화. 쿠퍼의 “STAY” 장면은 몇 번을 봐도 눈물을 자아낸다.",
  },
  {
    id: 2,
    date: "2025-04-14",
    user: {
      nickname: "무비덕후",
      role: "관객",
      preference: "스릴러 · SF",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    movie: {
      title: "인터스텔라",
      genre: "SF",
      avgScore: 4.5,
      poster:
        "https://image.tmdb.org/t/p/w185_and_h278_bestv2/8nO6UVikWSXVjRMzYbQV4MbEJyB.jpg",
    },
    myScore: 5,
    likeCount: 12,
    content:
      "블랙홀·상대성이론·부녀愛까지 완벽한 우주 가족영화. 쿠퍼의 “STAY” 장면은 몇 번을 봐도 눈물을 자아낸다.",
  },
  {
    id: 2,
    date: "2025-03-14",
    user: {
      nickname: "무비덕후",
      role: "관객",
      preference: "스릴러 · SF",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    movie: {
      title: "인터스텔라",
      genre: "SF",
      avgScore: 4.5,
      poster:
        "https://image.tmdb.org/t/p/w185_and_h278_bestv2/8nO6UVikWSXVjRMzYbQV4MbEJyB.jpg",
    },
    myScore: 5,
    likeCount: 12,
    content:
      "블랙홀·상대성이론·부녀愛까지 완벽한 우주 가족영화. 쿠퍼의 “STAY” 장면은 몇 번을 봐도 눈물을 자아낸다.",
  },
  {
    id: 2,
    date: "2023-07-14",
    user: {
      nickname: "무비덕후",
      role: "관객",
      preference: "스릴러 · SF",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    movie: {
      title: "인터스텔라",
      genre: "SF",
      avgScore: 4.5,
      poster:
        "https://image.tmdb.org/t/p/w185_and_h278_bestv2/8nO6UVikWSXVjRMzYbQV4MbEJyB.jpg",
    },
    myScore: 5,
    likeCount: 12,
    content:
      "블랙홀·상대성이론·부녀愛까지 완벽한 우주 가족영화. 쿠퍼의 “STAY” 장면은 몇 번을 봐도 눈물을 자아낸다.",
  },
  {
    id: 15,
    date: "2025-07-01",
    user: {
      nickname: "FILM_J",
      role: "감독",
      preference: "아트 · 실험",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    movie: {
      title: "테넷",
      genre: "액션 · SF",
      avgScore: 3.8,
      poster:
        "https://image.tmdb.org/t/p/w185_and_h278_bestv2/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
    },
    myScore: 4,
    likeCount: 20,
    content:
      "엔트로피 거스름돈까지 챙겨 가는 놀란의 시계태엽. 머리보다 귀를 믿어야 이해가 간다.",
  },
].sort((a, b) => b.date.localeCompare(a.date)); // 최신순 정렬

// 무한스크롤 상태
const PAGE_SIZE = 6;
const page = ref(0);
const visibleReviews = ref([]);
const endReached = ref(false);

// 다음 페이지 로드 (Arrow Function)
const loadNextPage = () => {
  if (endReached.value) return;
  const start = page.value * PAGE_SIZE;
  const next = allReviews.slice(start, start + PAGE_SIZE);
  if (next.length) {
    visibleReviews.value.push(...next);
    page.value++;
  }
  if (visibleReviews.value.length >= allReviews.length) {
    endReached.value = true;
  }
};

// 날짜 그룹화 Computed
const grouped = computed(() => {
  const map = new Map();
  visibleReviews.value.forEach((r) => {
    if (!map.has(r.date)) map.set(r.date, []);
    map.get(r.date).push(r);
  });
  return [...map.entries()].map(([date, reviews]) => ({ date, reviews }));
});

// 옵저버 초기화 (Arrow Function)
const sentinel = ref(null);
let observer = null;
const initObserver = () => {
  observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && loadNextPage()),
    { threshold: 1 }
  );
  if (sentinel.value) observer.observe(sentinel.value);
};

onMounted(() => {
  loadNextPage();
  initObserver();
});
onBeforeUnmount(() => {
  if (observer && sentinel.value) observer.unobserve(sentinel.value);
});
</script>

<template>
  <BaseBackground>
    <div class="mx-auto max-w-4xl pl-4 py-32">
      <!-- 날짜 -->
      <div class="flex flex-col gap-8 sm:gap-10 lg:gap-14">
        <div
          v-for="group in grouped"
          :key="group.date"
          class="relative flex gap-4 sm:gap-6"
        >
          <div class="relative flex w-[10%] shrink-0 flex-col items-center">
            <div class="sticky top-20 z-20 flex flex-col items-end">
              <!-- 년 -->
              <p class="sticky top-4 z-20 text-base font-bold">
                {{ group.date.slice(0, 4) }}
              </p>
              <!-- 월 -->
              <p class="sticky top-12 z-20 text-sm font-semibold">
                {{ group.date.slice(5, 7) }}
              </p>
              <!-- 일 -->
              <p class="text-sm font-semibold">
                {{ group.date.slice(8) }}
              </p>
            </div>
          </div>

          <!-- 리뷰 -->
          <div class="flex w-[75%] flex-col gap-8 sm:gap-10 lg:gap-14">
            <div
              v-for="review in group.reviews"
              :key="review.id"
              class="relative w-[full] overflow-hidden hover:bg-white/10 rounded-2xl border border-white/15 p-4 shadow-lg backdrop-blur transition hover:scale-[1.02] sm:p-6"
            >
              <!-- 유저 정보, 별점 -->
              <div
                class="flex flex-col pb-2 sm:pb-4 border-b border-white/15 sm:flex-row sm:items-center sm:justify-between"
              >
                <!-- 사진, 닉네임, 역할 -->
                <div class="flex items-center gap-3">
                  <img
                    :src="review.user.avatar"
                    alt="avatar"
                    class="h-8 w-8 rounded-full object-cover sm:h-8 sm:w-8"
                  />
                  <div>
                    <p
                      class="flex items-center gap-2 text-sm font-semibold text-white sm:text-base"
                    >
                      {{ review.user.nickname }}
                      <span
                        class="w-fit text-xs text-black font-bold px-2 py-0.5 rounded bg-yellow-400"
                      >
                        {{ review.user.role }}
                      </span>
                    </p>
                    <p class="text-[10px] text-white/60 sm:text-xs">
                      {{ review.user.preference }}
                    </p>
                  </div>
                </div>

                <!-- 팔로워의 별점 -->
                <div class="flex items-center text-amber-400">
                  <BaseRating :score="review.myScore" size="20" />
                  <span class="ml-2 text-[20px] font-medium text-amber-400">
                    {{ review.myScore ? review.myScore : "-" }}
                  </span>
                  <span
                    class="text-xs font-medium text-gray-200 opacity-50 mt-2"
                  >
                    {{ review.myScore ? "\u00A0/ 5.0" : "" }}
                  </span>
                </div>
              </div>

              <!-- 영화 정보 -->
              <div class="mt-4 flex gap-4">
                <img
                  :src="review.movie.poster"
                  alt="poster"
                  class="h-20 w-14 rounded object-cover shadow-sm sm:h-24 sm:w-16"
                />
                <div>
                  <p
                    class="truncate text-sm font-medium text-white sm:text-base"
                  >
                    {{ review.movie.title }}
                  </p>
                  <p class="text-[10px] text-white/60 sm:text-xs">
                    {{ review.movie.genre }}
                  </p>
                  <p
                    class="mt-1 flex items-center gap-1 text-xs text-white sm:text-sm"
                  >
                    평균 평점
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400"
                    >
                      <path
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      />
                    </svg>
                    {{ review.movie.avgScore.toFixed(1) }}
                  </p>
                </div>
              </div>

              <!-- 리뷰 내용 -->
              <p
                class="mt-4 text-xs leading-relaxed text-white/90 sm:mt-6 sm:text-sm border-b border-white/15 pb-4"
              >
                {{ review.content }}
              </p>

              <!-- 좋아요 -->
              <div class="flex justify-end">
                <button
                  class="mt-4 flex items-center gap-1 text-xs text-white/60 transition hover:text-amber-400 sm:text-sm"
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
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 무한스크롤 대상 -->
      <div ref="sentinel" class="h-1"></div>

      <!-- 피드 끝 -->
      <p
        v-if="endReached"
        class="mt-32 text-center text-xs text-white/60 sm:text-sm"
      >
        모든 리뷰를 다 확인했어요!
      </p>
    </div>
  </BaseBackground>
</template>
