<script setup>
import BaseReview from "../common/BaseReview.vue";
import BaseInput from "../common/BaseInput.vue";
import BaseButton from "../common/BaseButton.vue";
import BaseStarRating from "../common/BaseStarRating.vue";
import BaseTextArea from "../common/BaseTextArea.vue";
import { ref, computed } from "vue";
import { fetchKeywords } from "../../api/flask";
import { createReview } from "../../api/reviewApi";
import { useUserStore } from "../../stores/userStore";

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
</script>

<template>
  <div class="p-4 rounded-md">
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
      v-for="review in myReviews"
      :key="review.id"
      :avatar="review.profile_img_url"
      :rating="review.rating"
      :content="review.context"
      :nickname="review.nickname"
      starColor="text-amber-500"
      :userId="userStore.user.memberId"
    />
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
    />
  </div>
</template>
