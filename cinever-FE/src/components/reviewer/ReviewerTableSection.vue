<script setup>
import { ref, computed, onMounted } from "vue";
import { getReviewerAll } from "../../../src/api/reviewerApi";
import BaseBadge from "../common/BaseBadge.vue";

const dataList = ref([]);
const totalPages = ref(0);
const currentPage = ref(1);

const pageBlockSize = 4; // 한 번에 몇 페이지씩 보여줄지
const pageBlockStart = ref(1); // 현재 블록의 시작 페이지

const reviewerAll = async (page = 1) => {
  const res = await getReviewerAll(page);
  dataList.value = res.data.reviewerList.content;
  totalPages.value = res.data.reviewerList.totalPages;
  currentPage.value = page;

  // 현재 페이지가 블록 범위 밖이면 블록 이동
  if (page < pageBlockStart.value) {
    pageBlockStart.value = Math.max(1, page - pageBlockSize + 1);
  } else if (page >= pageBlockStart.value + pageBlockSize) {
    pageBlockStart.value = page;
  }
};

// 현재 블록에서 보여줄 페이지 번호 배열
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

// 이전 블록 이동
const prevPageBlock = () => {
  if (pageBlockStart.value > 1) {
    pageBlockStart.value = Math.max(1, pageBlockStart.value - pageBlockSize);
  }
};

// 다음 블록 이동
const nextPageBlock = () => {
  if (pageBlockStart.value + pageBlockSize <= totalPages.value) {
    pageBlockStart.value = pageBlockStart.value + pageBlockSize;
  }
};

onMounted(() => {
  reviewerAll(1);
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
            <td class="px-4 py-3 text-center">⭐ {{ data.review_avg }}</td>
            <td class="px-4 py-3 text-center">
              <div class="flex justify-center gap-3">
                <RouterLink
                  v-for="(movie, idx) in data.wishlist.slice(0, 3)"
                  :key="movie.movieId || idx"
                  :to="`/movie/${movie.movieId}`"
                  class="rounded hover:opacity-80 transition"
                >
                  <img
                    :src="movie.poster_path"
                    alt="wishlist_poster"
                    class="w-12 h-18 rounded object-cover transition-transform duration-300 ease-in-out hover:scale-150"
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
        v-for="data in dataList"
        :key="'card-' + data.memberId"
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
            {{ data.review_count }} &nbsp; | &nbsp; ⭐ {{ data.review_avg }}
          </div>
          <!-- <div class="flex mt-2 gap-2">
            <img
              v-for="movie in data.wishlist.slice(0, 3)"
              :key="movie.movieId"
              :src="movie.poster_path"
              class="w-12 h-18 rounded object-cover"
              alt="wishlist_poster"
            />
          </div> -->
          <div class="flex mt-2 gap-2">
            <RouterLink
              v-for="(movie, idx) in data.wishlist.slice(0, 3)"
              :key="movie.movieId || idx"
              :to="`/movie/${movie.movieId}`"
              class="rounded hover:opacity-80 transition"
            >
              <img
                :src="movie.poster_path"
                alt="wishlist_poster"
                class="w-12 h-18 rounded object-cover transition-transform duration-300 ease-in-out hover:scale-150"
              />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- 페이지네이션 -->
    <div class="flex flex-wrap gap-2 justify-center mt-6">
      <!-- 이전 버튼 -->
      <button
        @click="prevPageBlock"
        :disabled="pageBlockStart === 1"
        class="px-4 py-2 rounded bg-gray-500 text-white disabled:opacity-50"
      >
        Prev
      </button>

      <!-- 페이지 버튼 -->
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

      <!-- 다음 버튼 -->
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
