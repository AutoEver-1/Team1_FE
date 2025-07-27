<template>
  <div>
    <h2 class="text-xl font-semibold mb-6">리뷰어 관리</h2>
    <span class="text-sm text-gray-500">
      총 {{ filteredReviewers.length }}명
    </span>
    <div class="mb-6 mt-2 flex flex-wrap gap-4 items-center">
      <input
        type="text"
        placeholder="리뷰어 검색"
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

    <div class="overflow-x-auto rounded-lg border border-gray-200">
      <table class="w-full text-sm bg-white">
        <thead class="bg-amber-100 text-gray-700 font-semibold">
          <tr class="h-14">
            <th class="w-[40px] px-2 text-center">
              <input
                type="checkbox"
                @change="toggleAll"
                :checked="allSelected"
              />
            </th>
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
            <td class="px-2 text-center">
              <input
                type="checkbox"
                :value="reviewer.memberId"
                v-model="selectedIds"
              />
            </td>

            <td class="px-4 text-center">
              <img
                :src="getProfileImg(reviewer.profile_img_url)"
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
                <div v-if="selectedRoleId === reviewer.memberId">
                  <select
                    v-model="selectedRole"
                    class="border text-xs px-2 py-1 rounded"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="REVIEWER">REVIEWER</option>
                    <option value="INFLUENCER">INFLUENCER</option>
                    <option value="CRITIC">CRITIC</option>
                  </select>
                  <button
                    class="ml-2 px-2 py-1 text-xs border rounded bg-amber-100 text-amber-600"
                    @click="applyRoleChange(reviewer.memberId)"
                  >
                    적용
                  </button>
                </div>
                <button
                  v-else
                  class="px-2 py-1 text-xs border rounded bg-white hover:bg-amber-300 border-amber-300 text-amber-600"
                  @click="startRoleChange(reviewer.memberId, reviewer.role)"
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
                @click="toggleBan(reviewer.memberId, !reviewer.isBanned)"
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
import {
  getAdminReviewerList,
  blockReviewer,
  unblockReviewer,
  blockMultiReviewers,
  unblockMultiReviewers,
  updateReviewerRole,
} from "../../api/adminApi";
import { getProfileImg } from "../../services/defaultImg";

const reviewerList = ref([]);
const searchKeyword = ref("");
const selectedIds = ref([]);
const selectedRoleId = ref(null);
const selectedRole = ref("");

onMounted(() => {
  fetchReviewers();
});

const fetchReviewers = async () => {
  const res = await getAdminReviewerList();
  reviewerList.value = res.data.reviewerList;
};

const filteredReviewers = computed(() => {
  return reviewerList.value.filter((r) =>
    r.nickname.toLowerCase().includes(searchKeyword.value.toLowerCase())
  );
});

const toggleBan = async (memberId, isBanned) => {
  try {
    if (isBanned) {
      await blockReviewer(memberId, true);
    } else {
      await unblockReviewer(memberId, false);
    }
    alert("상태가 변경되었습니다.");
    fetchReviewers();
  } catch (err) {
    alert("상태 변경 실패: " + err.message);
  }
};

const startRoleChange = (memberId, currentRole) => {
  selectedRoleId.value = memberId;
  selectedRole.value = currentRole;
};

const applyRoleChange = async (memberId) => {
  try {
    await updateReviewerRole(memberId, selectedRole.value);
    alert("역할이 변경되었습니다.");
    selectedRoleId.value = null;
    fetchReviewers();
  } catch (err) {
    alert("역할 변경 실패: " + err.message);
  }
};

const toggleAll = (e) => {
  if (e.target.checked) {
    selectedIds.value = filteredReviewers.value.map((r) => r.memberId);
  } else {
    selectedIds.value = [];
  }
};

const allSelected = computed(() => {
  return (
    selectedIds.value.length > 0 &&
    selectedIds.value.length === filteredReviewers.value.length
  );
});

const blockSelected = async (isBlock) => {
  const payload = selectedIds.value.map((id) => ({
    memberId: id,
    isBanned: isBlock,
  }));
  try {
    if (isBlock) {
      await blockMultiReviewers(payload);
    } else {
      await unblockMultiReviewers(payload);
    }
    alert("다중 상태가 변경되었습니다.");
    selectedIds.value = [];
    fetchReviewers();
  } catch (err) {
    alert("다중 상태 변경 실패: " + err.message);
  }
};
</script>
