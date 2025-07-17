<script setup>
import { ref, onMounted } from "vue";
import { getUserInfo } from "../../api/user";
import { useRoute } from "vue-router";
import BaseBadge from "../../components/common/BaseBadge.vue";

// 라우터에서 전달받은 사용자 ID
const route = useRoute();
const data = ref({});

// 사용자 정보 조회 함수
const fetchUserInfo = async (id) => {
  const res = await getUserInfo(id);
  data.value = res.data;
};

onMounted(() => {
  const id = route.params.id;
  fetchUserInfo(id);
});
</script>

<template>
  <!-- 컨테이너: 모바일은 세로, 데탑은 가로 -->
  <div
    class="max-w-4xl mx-auto bg-white/20 backdrop-blur-lg rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6"
  >
    <div class="flex-shrink-0">
      <img
        v-if="data.profilePath"
        :src="data.profilePath"
        alt="profile_img"
        class="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/50 shadow-lg"
      />
    </div>

    <!-- 사용자 기본 정보 및 팔로우 버튼 -->
    <div class="flex-1 text-white">
      <!-- 닉네임과 역할 -->
      <div class="flex items-center justify-center sm:justify-start">
        <p class="text-xl font-bold">{{ data.nickname }}</p>
        <p
          class="w-fit text-xs text-black font-bold px-1 mt-1 ml-1 rounded bg-yellow-400"
        >
          {{ data.roleName }}
        </p>
      </div>

      <!-- 선호 장르 배지 -->
      <div>
        <BaseBadge :dataList="data.preferenceGenre" index="#" />
      </div>

      <!-- 팔로우 버튼 -->
      <button
        class="w-full mt-2 inline-block border border-white rounded-md hover:backdrop-blur-lg text-white font-semibold py-2 px-4"
      >
        팔로우 하기
      </button>
    </div>

    <!-- 리뷰 수, 팔로잉, 팔로워 카운트 -->
    <div class="flex gap-6 text-center text-white text-xs sm:text-sm h-auto">
      <div>
        <p class="text-xl font-bold">{{ data.reviewCount || 0 }}</p>
        <p>Reviews</p>
      </div>
      <div>
        <p class="text-xl font-bold">{{ data.followingCount || 0 }}</p>
        <p>Following</p>
      </div>
      <div>
        <p class="text-xl font-bold">{{ data.followerCount || 0 }}</p>
        <p>Followers</p>
      </div>
    </div>
  </div>
</template>
