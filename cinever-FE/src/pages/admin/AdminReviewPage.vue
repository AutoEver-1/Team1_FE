<template>
  <div>
    <h2 class="text-xl font-semibold mb-6">리뷰 관리</h2>
    <span class="text-sm text-gray-500">총 {{ filteredReviews.length }}건</span>
    <div class="mb-6 mt-2 flex flex-wrap gap-4 items-center">
      <input
        type="text"
        placeholder="리뷰 검색"
        class="flex-1 max-w-sm border px-3 py-2 rounded shadow-sm focus:ring-amber-400 focus:outline-none"
        v-model="searchKeyword"
      />
      <div class="flex gap-2">
        <button
          class="px-4 py-2 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50"
          @click="blockSelected(true)"
          :disabled="selectedIds.length === 0"
        >
          선택 비활성화
        </button>
        <button
          class="px-4 py-2 text-sm border border-emerald-300 text-emerald-600 rounded hover:bg-emerald-50"
          @click="blockSelected(false)"
          :disabled="selectedIds.length === 0"
        >
          선택 활성화
        </button>
      </div>
    </div>

    <!-- 리뷰 테이블 -->
    <div class="overflow-auto rounded-lg border border-gray-200">
      <table class="min-w-full text-sm bg-white table-fixed">
        <thead class="bg-amber-100 text-gray-700 font-semibold">
          <tr class="h-14">
            <th class="w-[40px] px-2 text-center">
              <input
                type="checkbox"
                @change="toggleAll"
                :checked="allSelected"
              />
            </th>
            <th class="px-4 text-center w-[100px]">포스터</th>
            <th class="px-4 text-left w-[180px]">영화 제목</th>
            <th class="px-4 text-left w-[160px]">리뷰어</th>
            <th class="px-4 text-center w-[80px]">평점</th>
            <th class="px-4 text-left">리뷰 내용</th>
            <th class="px-4 text-center w-[120px]">상태</th>
            <th class="px-4 text-center w-[120px]">관리</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(entry, index) in filteredReviews"
            :key="index"
            class="border-t hover:bg-amber-50 transition h-[96px]"
          >
            <td class="px-2 text-center">
              <input
                type="checkbox"
                :value="entry.review.reviewId"
                v-model="selectedIds"
              />
            </td>

            <td class="px-4 text-center">
              <img
                :src="getProfileImg(entry.movie.posterPath)"
                alt="poster"
                class="w-12 h-16 object-cover rounded border inline-block"
              />
            </td>

            <td class="px-4">
              <p class="font-semibold truncate">{{ entry.movie.title }}</p>
              <p class="text-xs text-gray-400 truncate">
                ID: {{ entry.movie.movieId }}
              </p>
            </td>

            <td class="px-4">
              <p class="font-medium truncate">{{ entry.review.nickname }}</p>
              <p class="text-xs text-gray-400 truncate">
                ID: {{ entry.review.memberId }}
              </p>
            </td>

            <td class="px-4 text-center">
              <span class="font-semibold text-gray-800">{{
                entry.review.rating
              }}</span>
            </td>

            <td class="px-4 py-4">
              <p class="text-sm whitespace-pre-wrap break-words max-w-100">
                {{ entry.review.content || "내용 없음" }}
              </p>
            </td>

            <td class="px-4 text-center">
              <span
                class="text-xs font-semibold px-2 py-1 rounded-full"
                :class="
                  entry.review.isBanned
                    ? 'bg-red-100 text-red-600'
                    : 'bg-emerald-100 text-emerald-600'
                "
              >
                {{ entry.review.isBanned ? "비활성화됨" : "활성화됨" }}
              </span>
            </td>

            <td class="px-4 text-center">
              <button
                class="px-3 py-1 text-xs border rounded"
                :class="
                  entry.review.isBanned
                    ? 'text-emerald-600 border-emerald-300 hover:bg-emerald-50'
                    : 'text-red-500 border-red-300 hover:bg-red-50'
                "
                @click="
                  toggleBan(entry.review.reviewId, !entry.review.isBanned)
                "
              >
                {{ entry.review.isBanned ? "활성화" : "비활성화" }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  getAdminReviewList,
  blockReview,
  unblockReview,
  blockMultiReviews,
  unblockMultiReviews,
} from "../../api/adminApi";
import { getProfileImg } from "../../services/defaultImg";

const reviewList = ref([]);
const searchKeyword = ref("");
const selectedIds = ref([]);

const getReview = async () => {
  const res = await getAdminReviewList();
  reviewList.value = res.data.reviewList;
};

onMounted(getReview);

const filteredReviews = computed(() => {
  return reviewList.value.filter((entry) =>
    entry.review.content
      ?.toLowerCase()
      .includes(searchKeyword.value.toLowerCase())
  );
});

const toggleBan = async (reviewId, isBanned) => {
  try {
    if (isBanned) {
      await blockReview(reviewId, true);
    } else {
      await unblockReview(reviewId, false);
    }
    alert("상태가 변경되었습니다.");
    getReview();
  } catch (err) {
    alert("상태 변경 실패: " + err.message);
  }
};

const toggleAll = (e) => {
  if (e.target.checked) {
    selectedIds.value = filteredReviews.value.map(
      (entry) => entry.review.reviewId
    );
  } else {
    selectedIds.value = [];
  }
};

const allSelected = computed(() => {
  return (
    selectedIds.value.length > 0 &&
    selectedIds.value.length === filteredReviews.value.length
  );
});

const blockSelected = async (isBlock) => {
  const payload = selectedIds.value.map((id) => ({
    reviewId: id,
    isBanned: isBlock,
  }));
  try {
    if (isBlock) {
      await blockMultiReviews(payload);
    } else {
      await unblockMultiReviews(payload);
    }
    alert("다중 상태가 변경되었습니다.");
    selectedIds.value = [];
    getReview();
  } catch (err) {
    alert("다중 상태 변경 실패: " + err.message);
  }
};
</script>
