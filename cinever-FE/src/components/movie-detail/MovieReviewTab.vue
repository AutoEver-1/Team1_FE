<script setup>
import BaseReview from "../common/BaseReview.vue";
import BaseInput from "../common/BaseInput.vue";
import BaseButton from "../common/BaseButton.vue";
import BaseStarRating from "../common/BaseStarRating.vue";
import BaseTextArea from "../common/BaseTextArea.vue";
import { ref, computed } from "vue";
import { fetchKeywords } from "../../api/flask";
import { createReview, updateReview, deleteReview } from "../../api/reviewApi";
import { useUserStore } from "../../stores/userStore";
import WordCloud from "vue3-word-cloud";

const keyword = ref("");
const rating = ref(0);
const extractedKeywords = ref([]);
const userStore = useUserStore();

const props = defineProps({
  dataList: Object,
  movieId: Number,
});

const filteredReviews = computed(() =>
  props.dataList?.filter((r) => r.isMine == false)
);

const myReviews = computed(() => props.dataList?.filter((r) => r.isMine));

const isEditing = ref(false);

const cancelEdit = () => {
  isEditing.value = false;
  keyword.value = "";
  rating.value = 0;
};

const startEdit = () => {
  const myReview = myReviews.value[0];
  if (myReview) {
    keyword.value = myReview.context;
    rating.value = myReview.rating;
    isEditing.value = true;
  }
};

const handleUpdate = async () => {
  if (!keyword.value.trim()) {
    alert("리뷰를 입력해주세요.");
    return;
  }

  if (!rating.value || rating.value < 0.5) {
    alert("별점을 입력해주세요.");
    return;
  }

  try {
    await updateReview(props.movieId, {
      memberId: userStore.user.memberId,
      context: keyword.value,
      rating: rating.value,
      movieId: props.movieId,
    });

    alert("리뷰가 수정되었습니다!");
    window.location.reload();
  } catch (error) {
    console.error("리뷰 수정 실패:", error);
    alert("리뷰 수정 중 오류가 발생했습니다.");
  }
};

const handleSubmit = async () => {
  if (!keyword.value.trim()) {
    alert("리뷰를 입력해주세요.");
    return;
  }

  if (!rating.value || rating.value < 0.5) {
    alert("별점을 입력해주세요.");
    return;
  }

  try {
    extractedKeywords.value = await fetchKeywords(keyword.value);
    console.log("키워드:", extractedKeywords.value);

    await createReview(props.movieId, {
      memberId: userStore.user.memberId,
      context: keyword.value,
      rating: rating.value,
      movieId: props.movieId,
    });

    alert("리뷰가 등록되었습니다!");
    window.location.reload();

    keyword.value = "";
    rating.value = 0;
    extractedKeywords.value = [];
  } catch (error) {
    console.error("리뷰 등록 실패:", error);
    alert("리뷰 등록 중 오류가 발생했습니다.", error);
  }
};

const handleDelete = async () => {
  const myReview = myReviews.value[0];
  if (!myReview) {
    alert("삭제할 리뷰가 없습니다.");
    return;
  }

  if (confirm("정말 삭제하시겠습니까?")) {
    try {
      await deleteReview(myReviews.id);
      alert("리뷰가 삭제되었습니다!");
      window.location.reload();
    } catch (error) {
      console.error("리뷰 삭제 실패:", error);
      alert("리뷰 삭제 중 오류가 발생했습니다.");
    }
  }
};
console.log(myReviews.value);
const averageRating = computed(() => {
  const all = props.dataList ?? [];
  const sum = all.reduce((acc, r) => acc + r.rating, 0);
  return all.length ? sum / all.length : 0;
});

// 별점별 개수
const starCounts = computed(() => {
  const counts = {};
  (props.dataList ?? []).forEach((r) => {
    const rounded = Math.round(r.rating);
    counts[rounded] = (counts[rounded] || 0) + 1;
  });
  return counts;
});

const getStarPercentage = (star) => {
  const total = props.dataList?.length || 0;
  return total ? ((starCounts.value[star] || 0) / total) * 100 : 0;
};

const wordData = ref([
  ["연출", 10],
  ["스토리", 8],
  ["연기", 12],
  ["OST", 6],
  ["긴장감", 9],
  ["감동", 7],
  ["지루함", 4],
  ["몰입감", 11],
  ["캐릭터", 5],
  ["전개", 6],
]);
</script>

<template>
  <div
    class="w-full flex flex-col md:flex-row justify-between px-6 pb-5 pt-6 gap-6"
  >
    <div class="md:w-1/2 w-full">
      <p class="text-white text-sm mb-3">
        평균 별점:
        <span class="text-yellow-400 text-xl font-bold">{{
          averageRating.toFixed(1)
        }}</span>
        / 5
      </p>

      <div
        v-for="star in [5, 4, 3, 2, 1]"
        :key="star"
        class="flex items-center gap-2 text-white text-sm"
      >
        <span class="w-8">{{ star }}점</span>
        <div class="bg-white/20 rounded h-4 flex-1 relative">
          <div
            class="bg-yellow-400 h-4 rounded"
            :style="{ width: getStarPercentage(star) + '%' }"
          />
        </div>
        <span class="w-6 text-right">{{ starCounts[star] || 0 }}</span>
      </div>
    </div>

    <div class="md:w-1/2 w-full">
      <div class="w-full h-full relative">
        <WordCloud
          :words="wordData"
          :color="
            ([, weight]) =>
              weight > 10 ? '#FDC500' : weight > 5 ? '#FFF066' : '#FFFBE1'
          "
          font-family="Roboto"
        />
      </div>
    </div>
  </div>
  <div v-if="myReviews.length === 0" class="p-4 rounded-md">
    <div class="mb-2 flex">
      <BaseStarRating v-model="rating" />
    </div>

    <div class="flex gap-2 justify-center items-center">
      <BaseTextArea
        v-model="keyword"
        placeholder="리뷰를 작성해주세요"
        minRows="4"
        maxRows="4"
      />
    </div>
    <div class="flex gap-2 justify-end mt-3">
      <BaseButton
        label="등록"
        class="w-[15%] bg-yellow-400 hover:bg-yellow-500 text-black h-9 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-[min(3.5vw,14px)]"
        @click="handleSubmit"
      />
    </div>
  </div>
  <div class="bg-[#16130f] p-6 space-y-4 gap-1 mb-4">
    <p class="text-white">
      <span class="text-amber-500 text-xl font-semibold">My</span> 리뷰
    </p>
    <BaseReview
      v-if="!isEditing"
      v-for="review in myReviews"
      :key="review.id"
      :avatar="review.profile_img_url"
      :rating="review.rating"
      :content="review.context"
      :nickname="review.nickname"
      starColor="text-amber-500"
      :userId="userStore.user.memberId"
    />

    <!-- 작성/수정 폼 -->
    <div v-if="!myReviews.length === 0 || isEditing" class="p-4 rounded-md">
      <div class="mb-2 flex">
        <BaseStarRating v-model="rating" />
      </div>

      <div class="flex gap-2 justify-center items-center">
        <BaseTextArea
          v-model="keyword"
          placeholder="리뷰를 작성해주세요"
          minRows="4"
          maxRows="4"
        />
      </div>

      <div class="flex gap-2 justify-end mt-3">
        <!-- 수정 모드 -->
        <BaseButton
          v-if="isEditing"
          label="취소"
          class="w-[15%] bg-yellow-400 hover:bg-yellow-500 text-black h-9 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-[min(3.5vw,14px)]"
          @click="cancelEdit"
        />
        <BaseButton
          v-if="isEditing"
          label="수정 완료"
          class="w-[15%] bg-yellow-400 hover:bg-yellow-500 text-black h-9 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-[min(3.5vw,14px)]"
          @click="handleUpdate"
        />
      </div>
    </div>
    <div class="flex gap-2 justify-end mt-3">
      <BaseButton
        v-if="myReviews.length > 0 && !isEditing"
        label="수정"
        class="w-[15%] bg-yellow-400 hover:bg-yellow-500 text-black h-9 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-[min(3.5vw,14px)]"
        @click="startEdit"
      />
      <BaseButton
        v-if="myReviews.length > 0 && !isEditing"
        label="삭제"
        class="w-[15%] bg-yellow-400 hover:bg-yellow-500 text-black h-9 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-[min(3.5vw,14px)]"
        @click="handleDelete"
      />
    </div>
  </div>

  <div class="min-h-screen bg-[#16130f] p-6 space-y-4">
    <p class="text-white">
      <span class="text-amber-500 text-xl font-semibold">{{
        filteredReviews?.length
      }}</span>
      건의 리뷰
    </p>
    <BaseReview
      v-for="review in filteredReviews"
      :key="review.id"
      :avatar="review.profile_img_url"
      :rating="review.rating"
      :content="review.context"
      :nickname="review.nickname"
      starColor="text-amber-500"
      :userId="review.memberId"
    />
  </div>
</template>
