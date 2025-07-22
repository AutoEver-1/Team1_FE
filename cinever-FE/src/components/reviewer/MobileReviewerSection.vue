<script setup>
import { ref, onMounted, nextTick } from "vue";
import { getReviewerAll } from "../../api/reviewerApi";
import {
  HeartIcon,
  StarIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/vue/24/solid";
import { useRouter } from "vue-router";
import { getReviewerRoleMeta } from "../../utils/reviewerRole";
import { getProfileImg } from "../../services/defaultImg";

const dataList = ref([]);
const page = ref(1);
const hasMore = ref(true);
const observerEl = ref(null);
let observer = null;
const router = useRouter();

const toDetailUser = (id) => {
  router.push("/user/" + id);
};

const fetchData = async () => {
  try {
    const res = await getReviewerAll(page.value);
    const newList = res.data.reviewerList.content;

    if (!newList || newList.length === 0) {
      hasMore.value = false;
      return;
    }

    dataList.value.push(...newList);
    page.value++;
  } catch (err) {
    console.error("불러오기 실패:", err);
    hasMore.value = false;
  }
};

onMounted(async () => {
  await fetchData();
  await nextTick();
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && hasMore.value) {
      fetchData();
    }
  });

  if (observerEl.value) {
    observer.observe(observerEl.value);
  }
});
</script>

<template>
  <div class="flex flex-col gap-4 mt-5">
    <div
      v-for="(data, i) in dataList"
      :key="data.memberId"
      class="w-[90vw] mx-auto bg-white/5 backdrop-blur-md rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-row gap-4 p-4"
    >
      <div
        class="flex flex-col items-center justify-center w-40"
        @click="toDetailUser(data.memberId)"
      >
        <img
          :src="getProfileImg(data.profile_img_url)"
          alt="profile"
          class="w-16 h-16 rounded-full object-cover"
        />
        <div class="mt-2 flex flex-col items-center gap-1">
          <div
            class="w-fit px-2 py-0.5 text-xs font-semibold rounded-full border backdrop-blur-md backdrop-saturate-150"
            :class="getReviewerRoleMeta(data.role).badgeClass"
          >
            {{ getReviewerRoleMeta(data.role).roleName }}
          </div>
          <p class="text-sm font-semibold">{{ data.nickname }}</p>
        </div>
      </div>

      <div class="flex flex-col justify-center items-center flex-1">
        <div class="flex flex-wrap gap-2 mb-2">
          <span
            v-for="genre in data.genre_preference"
            :key="genre"
            class="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white"
          >
            #{{ genre }}
          </span>
        </div>

        <div class="flex justify-center gap-6 text-sm text-gray-300 mb-2">
          <p class="flex justify-center items-center gap-1">
            <HeartIcon class="w-4 h-4 text-red-400" />
            <span>{{ data.follower_cnt }}</span>
          </p>
          <p class="flex justify-center items-center gap-1">
            <ChatBubbleLeftEllipsisIcon class="w-4 h-4 text-slate-200" />
            <span>{{ data.review_count }}</span>
          </p>
          <p class="flex justify-center items-center gap-1">
            <StarIcon class="w-4 h-4 text-amber-400" />
            <span>{{ data.review_avg?.toFixed(1) || "0.0" }}</span>
          </p>
        </div>

        <div class="flex gap-2">
          <RouterLink
            v-for="(movie, idx) in data.wishlist?.slice(0, 3) || []"
            :key="movie.movieId || idx"
            :to="`/movie/${movie.movieId}`"
          >
            <img
              :src="movie.poster_path"
              alt="wish"
              class="w-14 h-20 rounded object-cover hover:opacity-90 transition"
            />
          </RouterLink>
        </div>
      </div>
    </div>

    <div ref="observerEl" class="h-10"></div>
  </div>
</template>
