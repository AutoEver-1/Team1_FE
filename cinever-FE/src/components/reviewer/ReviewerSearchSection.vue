<template>
  <div class="w-full relative">
    <div class="flex flex-col">
      <!-- 검색창 + 버튼 -->
      <div class="flex">
        <!-- 키보드 이벤트 바인딩 wrapper -->
        <div
          class="w-full flex"
          @keydown.down.prevent="moveDown"
          @keydown.up.prevent="moveUp"
          @keyup.enter="handleEnter"
        >
          <div class="w-full relative">
            <BaseInput
              v-model="keyword"
              placeholder="보고싶은 Reviewer를 검색해보세요"
              inputClass="w-full border-yellow-400 bg-[#12100E] py-2 px-4 bg-opacity-70"
            />
            <!-- 검색 결과 dropdown -->
            <div
              v-if="isSearched"
              ref="dropdownRef"
              class="absolute top-[42px] left-0 z-10 w-full flex flex-col items-center p-1 rounded-[10px] border border-white/20 bg-amber-900/90 backdrop-blur-md shadow-md"
            >
              <div v-if="reviewerList.length" class="w-full">
                <div
                  v-for="(r, idx) in reviewerList"
                  :key="r.memberId"
                  @click="selectReviewer(r.memberId)"
                  @mouseover="hoveredIndex = idx"
                  @mouseleave="hoveredIndex = -1"
                  :class="[
                    'w-full flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 py-2 cursor-pointer rounded-md transition duration-300',
                    idx === highlightedIndex || idx === hoveredIndex
                      ? 'bg-white/20 '
                      : 'hover:bg-white/20',
                  ]"
                >
                  <div class="flex gap-3 items-center w-full">
                    <img
                      :src="r.profile_img_url"
                      alt="profile_img"
                      class="rounded-full w-12 h-12 object-cover"
                    />
                    <div class="flex-1">
                      <div class="flex items-center">
                        <p class="font-semibold text-white">{{ r.nickname }}</p>
                        <p
                          class="w-fit text-xs text-black font-bold px-1 mt-1 ml-1 rounded bg-yellow-400"
                        >
                          {{ r.role }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="w-full text-xs font-semibold text-white sm:text-right text-left mt-2 sm:mt-0 pl-12"
                  >
                    ❤️ {{ r.follower_cnt }} &nbsp; ✏️
                    {{ r.review_count }} &nbsp; ⭐
                    {{ r.review_avg ? Number(r.review_avg).toFixed(1) : "0.0" }}
                  </div>
                </div>
              </div>
              <div v-else class="text-white px-4 py-2 w-full text-center">
                검색 결과가 없습니다.
              </div>
            </div>
          </div>
        </div>
        <!-- 검색 버튼 -->
        <div ref="buttonRef">
          <BaseButton
            label="검색"
            class="w-[10%] text-sm max-w-xs min-w-[60px] bg-yellow-400 hover:bg-yellow-500 text-black ml-3"
            @click="handleSearch"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import BaseInput from "../common/BaseInput.vue";
import BaseButton from "../common/BaseButton.vue";
import BaseBadge from "../common/BaseBadge.vue";
import { getReviewerDetail } from "../../api/reviewerApi";

const keyword = ref("");
const isSearched = ref(false);
const reviewerList = ref([]);
const highlightedIndex = ref(-1);
const hoveredIndex = ref(-1);
const dropdownRef = ref(null);
const buttonRef = ref(null);
const router = useRouter();

// 실제 검색 수행
const handleSearch = async () => {
  isSearched.value = true;
  reviewerList.value = [];
  highlightedIndex.value = -1;
  hoveredIndex.value = -1;

  const word = keyword.value.trim();
  if (!word) return;

  try {
    const res = await getReviewerDetail(word);
    reviewerList.value = res.data.reviewerList || [];
  } catch (e) {
    console.error("검색 실패:", e);
  }
};

// Enter 눌렀을 때 이동 또는 검색
const handleEnter = () => {
  if (
    isSearched.value &&
    highlightedIndex.value >= 0 &&
    highlightedIndex.value < reviewerList.value.length
  ) {
    selectReviewer(reviewerList.value[highlightedIndex.value].memberId);
  } else if (!isSearched.value) {
    handleSearch();
  }
};

// 방향키 아래/위로 highlightedIndex 변경
const moveDown = () => {
  if (!isSearched.value || !reviewerList.value.length) return;
  highlightedIndex.value =
    (highlightedIndex.value + 1) % reviewerList.value.length;
};
const moveUp = () => {
  if (!isSearched.value || !reviewerList.value.length) return;
  highlightedIndex.value =
    (highlightedIndex.value - 1 + reviewerList.value.length) %
    reviewerList.value.length;
};

// 선택 시 상세 페이지로 이동
const selectReviewer = (id) => {
  isSearched.value = false;
  highlightedIndex.value = -1;
  hoveredIndex.value = -1;
  keyword.value = "";
  router.push(`/user/${id}`);
};

// 외부 클릭 시 닫기
const handleClickOutside = (e) => {
  if (
    isSearched.value &&
    dropdownRef.value &&
    !dropdownRef.value.contains(e.target) &&
    !(buttonRef.value && buttonRef.value.contains(e.target))
  ) {
    isSearched.value = false;
    highlightedIndex.value = -1;
    hoveredIndex.value = -1;
  }
};

// ESC 키로 닫기
const handleEscKey = (e) => {
  if (e.key === "Escape") {
    isSearched.value = false;
    highlightedIndex.value = -1;
    hoveredIndex.value = -1;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleEscKey);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleEscKey);
});
</script>
