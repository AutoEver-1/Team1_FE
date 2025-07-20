<script setup>
import { onMounted, ref } from "vue";
import { getUserReviewInfo } from "../../api/user";

const totalReviewCount = ref(0);
const reviewList = ref([]);

const userReviewInfo = async (id) => {
  const res = await getUserReviewInfo(id);
  const serverData = res.data;
  totalReviewCount.value = serverData.totalReviewCount;
  reviewList.value = serverData.reviewList;
  console.log("유저 리뷰 개수:", totalReviewCount.value);
  console.log("리뷰 목록:", reviewList.value);
};

onMounted(() => {
  userReviewInfo(1);
});
</script>

<template>
  <div v-for="review in reviewList" class="mb-10">
    <p>영화 id: {{ review.movieId }}</p>
    <p>영화 제목: {{ review.title }}</p>
    <p>영화 포스터 url: {{ review.posterPath }}</p>
    <p>영화 개봉일: {{ review.releaseDate }}</p>
    <p>평점: {{ review.rating }}</p>
    <p>리뷰 작성일: {{ review.reviewDate }}</p>
    <p>리뷰 내용: {{ review.context }}</p>
    <p>좋아요: {{ review.likeCount }}</p>
    <p>성인여부: {{ review.adult }}</p>
  </div>
</template>
