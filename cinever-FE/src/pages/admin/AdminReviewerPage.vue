<template>
  <div>
    <h2 class="text-xl font-semibold mb-6">리뷰어 관리</h2>

    <div class="mb-6 flex gap-4 items-center justify-between">
      <input
        type="text"
        placeholder="리뷰어 검색"
        class="flex-1 max-w-sm border px-3 py-2 rounded shadow-sm focus:ring-amber-400 focus:outline-none"
        v-model="searchKeyword"
      />
      <span class="text-sm text-gray-500"
        >총 {{ filteredReviewers.length }}명</span
      >
    </div>

    <div class="overflow-auto rounded-lg border border-gray-200">
      <table class="min-w-full text-sm bg-white table-fixed">
        <thead class="bg-amber-100 text-gray-700 font-semibold">
          <tr class="h-14">
            <th class="px-4 text-center w-[100px]">프로필</th>
            <th class="px-4 text-left w-[180px]">닉네임</th>
            <th class="px-4 text-center w-[100px]">팔로워</th>
            <th class="px-4 text-center w-[100px]">리뷰</th>
            <th class="px-4 text-center w-[150px]">역할</th>
            <th class="px-4 text-center w-[120px]">상태</th>
            <th class="px-4 text-center w-[120px]">관리</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="reviewer in filteredReviewers"
            :key="reviewer.memberId"
            class="border-t hover:bg-amber-50 transition h-[88px]"
          >
            <td class="px-4">
              <img
                :src="reviewer.profile_img_url"
                alt="profile"
                class="w-14 h-14 rounded-full object-cover border mx-auto"
              />
            </td>

            <td class="px-4">
              <p class="font-medium truncate">{{ reviewer.nickname }}</p>
              <p class="text-xs text-gray-400 truncate">
                ID: {{ reviewer.memberId }}
              </p>
            </td>

            <td class="px-4 text-center">
              <span class="font-semibold text-gray-800">{{
                reviewer.follower_cnt
              }}</span>
            </td>

            <td class="px-4 text-center">
              <span class="font-semibold text-gray-800">{{
                reviewer.review_count
              }}</span>
            </td>

            <td class="px-4 text-center">
              <div class="flex flex-col items-center gap-1">
                <span
                  class="text-xs font-semibold px-2 py-1 rounded-full bg-amber-200 text-amber-600"
                >
                  {{ reviewer.role }}
                </span>
                <button
                  class="px-2 py-1 text-xs border rounded bg-white hover:bg-amber-300 border-amber-300 text-amber-600"
                >
                  변경
                </button>
              </div>
            </td>

            <td class="px-4 text-center">
              <span
                class="text-xs font-semibold px-2 py-1 rounded-full"
                :class="
                  reviewer.isBanned
                    ? 'bg-red-100 text-red-600'
                    : 'bg-emerald-100 text-emerald-600'
                "
              >
                {{ reviewer.isBanned ? "비활성화됨" : "활성화됨" }}
              </span>
            </td>

            <td class="px-4 text-center">
              <button
                class="px-3 py-1 text-xs border rounded"
                :class="
                  reviewer.isBanned
                    ? 'text-emerald-600 border-emerald-300 hover:bg-emerald-50'
                    : 'text-red-500 border-red-300 hover:bg-red-50'
                "
              >
                {{ reviewer.isBanned ? "활성화" : "비활성화" }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getAdminReviewer } from "../../api/adminApi";

const reviewerList = ref([]);
const searchKeyword = ref("");

onMounted(() => {
  getReviewer();
});

const getReviewer = async () => {
  const res = await getAdminReviewer();
  reviewerList.value = res.data.reviewerList;
  console.log(reviewerList);
};

const filteredReviewers = computed(() => {
  return reviewerList.value.filter((r) =>
    r.nickname.toLowerCase().includes(searchKeyword.value.toLowerCase())
  );
});
</script>
