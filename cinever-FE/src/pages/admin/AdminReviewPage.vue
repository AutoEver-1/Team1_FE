<template>
  <div>
    <h2 class="text-xl font-semibold mb-6">리뷰 관리</h2>

    <div class="mb-6 flex gap-4 items-center justify-between">
      <input
        type="text"
        placeholder="리뷰 검색"
        class="flex-1 max-w-sm border px-3 py-2 rounded shadow-sm focus:ring-amber-400 focus:outline-none"
        v-model="searchKeyword"
      />
      <span class="text-sm text-gray-500"
        >총 {{ filteredReviews.length }}건</span
      >
    </div>

    <div class="overflow-auto rounded-lg border border-gray-200">
      <table class="min-w-full text-sm bg-white table-fixed">
        <thead class="bg-amber-100 text-gray-700 font-semibold">
          <tr class="h-14">
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
            <td class="px-4 text-center">
              <img
                :src="entry.movie.posterPath"
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
                {{
                  entry.review.contents
                    ? entry.review.contents
                    : ` entry.review.contents`
                }}
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
import { getAdminReview } from "../../api/adminApi";

const reviewList = ref([]);
const searchKeyword = ref("");

onMounted(() => {
  getReview();
});

const getReview = async () => {
  const res = await getAdminReview();
  reviewList.value = res.data.reviewList;
  console.log(reviewList);
};

const filteredReviews = computed(() => {
  return reviewList.value.filter((entry) =>
    entry.review.nickname
      .toLowerCase()
      .includes(searchKeyword.value.toLowerCase())
  );
});
</script>
