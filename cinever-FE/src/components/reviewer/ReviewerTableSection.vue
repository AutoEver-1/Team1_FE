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
import { getReviewerRoleMeta } from "../../utils/reviewerRole";
import BasePagination from "../common/BasePagination.vue";
import { getPaginatedList, getTotalPages } from "../../services/paging";

const dataList = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);

const router = useRouter();

const totalPages = getTotalPages(dataList, itemsPerPage);
const paginatedList = getPaginatedList(dataList, currentPage, itemsPerPage);

const reviewerAll = async (page = 1) => {
  const res = await getReviewerAll(page);
  dataList.value = res.data.reviewerList.content;
  console.log(res.data.reviewerList.content);

  currentPage.value = page;
};

const handlePageChange = (page) => {
  currentPage.value = page;
  reviewerAll(page); // 새로운 페이지에 맞게 데이터 fetch
};

const goToUserDetail = (memberId) => {
  router.push(`user/${memberId}`);
};

onMounted(() => {
  reviewerAll();
});
</script>

<template>
  <div class="w-full">
    <table class="w-full text-left text-sm text-white">
      <thead class="uppercase text-amber-500 text-xs text-center">
        <tr>
          <th class="px-4">Rank</th>
          <th class="px-4 py-3">User name</th>
          <th class="px-4 py-3">Like</th>
          <th class="px-4 py-3">Reviews</th>
          <th class="px-4 py-3">Rating</th>
          <th class="px-4 py-3">Movie</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(data, i) in paginatedList"
          :key="data.memberId"
          class="backdrop-blur-2xl backdrop-saturate-150 shadow-sm hover:shadow-md brightness-90 hover:brightness-100"
          :class="getReviewerRoleMeta(data.role).roleClass"
        >
          <td class="px-4 py-4 text-center">
            {{ i + 1 + currentPage * itemsPerPage }}
          </td>
          <td
            class="px-4 py-4 cursor-pointer"
            @click="goToUserDetail(data.memberId)"
          >
            <div class="flex items-center gap-7">
              <img
                :src="data.profile_img_url"
                alt="profile_img"
                class="w-16 h-16 rounded-full object-cover"
              />
              <div class="flex flex-col">
                <div class="flex items-center gap-2">
                  <p class="text-white text-base font-semibold">
                    {{ data.nickname }}
                  </p>
                  <div
                    class="w-fit px-2 py-0.5 text-xs font-semibold rounded-full border backdrop-blur-md backdrop-saturate-150"
                    :class="getReviewerRoleMeta(data.role).badgeClass"
                  >
                    {{ getReviewerRoleMeta(data.role).roleName }}
                  </div>
                </div>

                <!-- 장르 배지 -->
                <div class="mt-1 flex gap-1">
                  <span
                    v-for="genre in data.genre_preference"
                    :key="genre"
                    class="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white"
                  >
                    #{{ genre }}
                  </span>
                </div>
              </div>
            </div>
          </td>
          <td class="px-4 py-4 text-center">
            <p class="flex justify-center items-center h-full">
              <HeartIcon class="w-4 h-4 text-red-400 mr-1" />
              {{ data.follower_cnt }}
            </p>
          </td>
          <td class="px-4 py-4 text-center">
            <p class="flex justify-center items-center h-full">
              <ChatBubbleLeftEllipsisIcon class="w-4 h-4 text-slate-200 mr-1" />
              {{ data.review_count }}
            </p>
          </td>
          <td class="px-4 py-4 text-center">
            <p class="flex justify-center items-center h-full">
              <StarIcon class="w-4 h-4 text-amber-500 mr-1" />
              {{ data.review_avg ? Number(data.review_avg).toFixed(1) : "0.0" }}
            </p>
          </td>
          <td class="px-4 py-4 text-center">
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

    <!-- 페이지 네이션 -->
    <BasePagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @change="handlePageChange"
    />
  </div>
</template>
