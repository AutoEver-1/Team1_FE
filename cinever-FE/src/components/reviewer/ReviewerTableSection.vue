<script setup>
import { ref, onMounted, computed, watch, nextTick } from "vue";
import { getReviewerAll } from "../../api/reviewerApi";
import BaseBadge from "../common/BaseBadge.vue";
import { useRoute, useRouter } from "vue-router";
import {
  HeartIcon,
  StarIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/vue/24/solid";

const dataList = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const router = useRouter();
const route = useRoute();

const pageBlockSize = 5;
const pageBlockStart = ref(1);

const reviewerAll = async (page = 1) => {
  const res = await getReviewerAll(page);
  dataList.value = res.data.reviewerList.content;
  totalPages.value = res.data.reviewerList.totalPages - 1;
  currentPage.value = page;

  if (page < pageBlockStart.value) {
    pageBlockStart.value = Math.max(1, page - pageBlockSize + 1);
  } else if (page >= pageBlockStart.value + pageBlockSize) {
    pageBlockStart.value = page;
  }
};

const toDetailUser = (id) => {
  router.push("/user/" + id);
};

const goPage = async (page) => {
  router.push({ query: { ...route.query, page } });
  await reviewerAll(page);
  currentPage.value = page;
  await nextTick();
  window.scrollTo({ top: 0, behavior: "auto" });
};

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

onMounted(async () => {
  const initialPage = parseInt(route.query.page) || 1;
  await reviewerAll(initialPage);
  currentPage.value = initialPage;
});

watch(
  () => route.query.page,
  async (newPage) => {
    const page = parseInt(newPage) || 1;
    await reviewerAll(page);
    currentPage.value = page;
  }
);
</script>

<template>
  <div class="w-full">
    <table class="w-full text-left text-sm text-white">
      <thead
        class="uppercase text-yellow-400 border-b border-yellow-400 text-xs"
      >
        <tr>
          <th class="px-4 text-center">Rank</th>
          <th class="px-4 py-3">User name</th>
          <th class="px-4 py-3 text-center">Like</th>
          <th class="px-4 py-3 text-center">Reviews</th>
          <th class="px-4 py-3 text-center">Rating</th>
          <th class="px-4 py-3 text-center">Movie</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(data, i) in dataList"
          :key="data.memberId"
          class="border-b border-[#FFD40063]"
        >
          <td class="px-4 py-3 text-center">
            {{ i + 1 + currentPage * 10 }}
          </td>
          <td
            class="px-4 py-3 cursor-pointer"
            @click="toDetailUser(data.memberId)"
          >
            <div class="flex items-center gap-3">
              <img
                :src="data.profile_img_url"
                alt="profile_img"
                class="w-12 h-12 rounded-full object-cover"
              />
              <div class="flex flex-col">
                <div class="flex items-center">
                  <p class="text-white text-sm font-semibold">
                    {{ data.nickname }}
                  </p>
                  <p
                    class="w-fit text-xs text-black font-bold px-1 ml-1 rounded bg-yellow-400"
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
          <td class="px-4 py-3 text-center">
            <p class="flex justify-center items-center h-full">
              <HeartIcon class="w-4 h-4 text-red-400 mr-1" />
              {{ data.follower_cnt }}
            </p>
          </td>
          <td class="px-4 py-3 text-center">
            <p class="flex justify-center items-center h-full">
              <ChatBubbleLeftEllipsisIcon class="w-4 h-4 text-slate-200 mr-1" />
              {{ data.review_count }}
            </p>
          </td>
          <td class="px-4 py-3 text-center">
            <p class="flex justify-center items-center h-full">
              <StarIcon class="w-4 h-4 text-amber-500 mr-1" />
              {{ data.review_avg ? Number(data.review_avg).toFixed(1) : "0.0" }}
            </p>
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
                  class="w-12 h-18 rounded object-cover transition-transform duration-300 hover:scale-110"
                />
              </RouterLink>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex flex-wrap gap-8 justify-center mt-6">
      <button
        @click="prevPageBlock"
        :disabled="pageBlockStart === 1"
        class="px-4 py-2 rounded bg-gray-500 text-white disabled:opacity-50"
      >
        ◀
      </button>

      <button
        v-for="n in visiblePages"
        :key="n"
        @click="goPage(n)"
        :class="n === currentPage ? 'text-amber-400 font-bold' : 'text-white'"
      >
        {{ n }}
      </button>

      <button
        @click="nextPageBlock"
        :disabled="pageBlockStart + pageBlockSize > totalPages"
        class="px-4 py-2 rounded bg-gray-500 text-white disabled:opacity-50"
      >
        ▶
      </button>
    </div>
  </div>
</template>
