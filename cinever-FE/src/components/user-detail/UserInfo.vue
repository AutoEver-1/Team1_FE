<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getUserInfo } from "../../api/user";
import BaseBadge from "../../components/common/BaseBadge.vue";
import BaseModal from "../../components/common/BaseModal.vue";
import { useUserStore } from "../../stores/userStore";
import Profile from "../../assets/images/default_profile.png";
import BaseProfileImage from "../../components/common/BaseProfileImage.vue";

defineProps({ reviewCount: Number });
// 라우터 및 사용자 스토어 준비
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const imgSrc = ref();

// 현재 로그인된 사용자 ID
const currentUserId = computed(() =>
  userStore.isLoggedIn ? userStore.user.memberId : null
);

// 프로필 페이지 대상 사용자 ID
const profileUserId = computed(() => Number(route.params.id));

// 본인 프로필 여부 계산
const isOwnProfile = computed(
  () => currentUserId.value === profileUserId.value
);

// 사용자 정보 저장
const data = ref({});

// 모달 열림 상태
const isFollowingModalOpen = ref(false);
const isFollowersModalOpen = ref(false);

// 사용자 정보 조회 함수
async function fetchUserInfo(id) {
  const res = await getUserInfo(id);
  data.value = res.data;
  imgSrc.value = data.value.profilePath;
  console.log(data);
}

// URL 파라미터(id) 변경 감지 → 데이터 다시 로드
watch(
  () => route.params.id,
  (newId) => {
    fetchUserInfo(newId);
  }
);

// 컴포넌트 마운트 시 초기 호출
onMounted(() => {
  fetchUserInfo(route.params.id);
});

function onImgError() {
  imgSrc.value = Profile;
}

// 팔로잉/팔로워 모달 열기 함수
const openFollowingModal = () => {
  isFollowingModalOpen.value = true;
};
const openFollowersModal = () => {
  isFollowersModalOpen.value = true;
};

// 사용자 페이지 이동 함수
const goToUserPage = (userId) => {
  router.push({ name: "User", params: { id: userId } });
};

// 성별 변환
const genderLabel = computed(() => {
  if (!data.value.gender) return "-";
  return data.value.gender === "female" ? "여성" : "남성";
});

// 생일 포맷
const birthLabel = computed(() => {
  if (!data.value.birth) return "-";
  const date = new Date(data.value.birth);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
});
</script>

<template>
  <div class="w-[full] max-w-4xl mx-auto px-6 pt-12 text-white">
    <div class="flex flex-col md:flex-row items-center md:items-start gap-10">
      <BaseProfileImage :src="imgSrc" size="160px" />
      <div class="flex-1 w-full">
        <div class="flex items-center justify-between">
          <div class="flex flex-col gap-1">
            <h2 class="text-2xl font-bold">
              {{ data.nickname }}
              <span
                class="ml-2 inline-block text-sm font-bold bg-amber-500 text-black px-2 py-0.5 rounded group-hover:text-[10px] group-hover:h-5 group-hover:py-0"
              >
                {{ data.roleName }}
              </span>
            </h2>
            <p class="mt-1 text-sm font-semibold text-gray-500">
              {{ genderLabel }} · {{ birthLabel }}
            </p>
            <div class="flex flex-wrap gap-2 mt-3 justify-center">
              <span
                v-for="genre in data.preferenceGenre"
                :key="genre"
                class="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white"
              >
                #{{ genre }}
              </span>
            </div>
          </div>

          <button
            v-if="!isOwnProfile"
            class="text-sm border border-white px-4 py-1.5 rounded hover:bg-white/10"
          >
            + 팔로우 하기
          </button>
        </div>

        <div
          class="grid grid-cols-4 gap-4 mt-10 text-center text-sm text-gray-400 md:mx-12"
        >
          <div>
            <p class="text-xl font-bold text-white">
              {{ reviewCount ? reviewCount : "-" }}
            </p>
            <p>Reviews</p>
          </div>
          <!-- Following -->
          <div class="cursor-pointer" @click="openFollowingModal">
            <p class="text-xl font-bold text-white">
              {{ data.followingCount ? data.followingCount : "-" }}
            </p>
            <p>Following</p>
          </div>

          <!-- Followers -->
          <div class="cursor-pointer" @click="openFollowersModal">
            <p class="text-xl font-bold text-white">
              {{ data.followerCount ? data.followerCount : "-" }}
            </p>
            <p>Followers</p>
          </div>

          <div>
            <p class="text-xl font-bold text-white">
              {{ data.wishList?.length ? data.wishList?.length : "-" }}
            </p>
            <p>Wishlist</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 팔로잉 목록 모달 -->
  <BaseModal
    v-model:isOpen="isFollowingModalOpen"
    contentClass="w-full max-w-lg p-6"
  >
    <template #header>
      <h3 class="text-lg font-bold">팔로잉 목록</h3>
    </template>
    <template #default>
      <div v-if="data.followingList && data.followingList.length">
        <div
          v-for="following in data.followingList"
          :key="following.memberId"
          class="py-3 cursor-pointer"
          @click="goToUserPage(following.memberId)"
        >
          <div class="flex items-center">
            <BaseProfileImage :src="following.profilePath" size="40px" />
            <p class="pl-4 text-white font-medium">{{ following.nickname }}</p>
          </div>
          <hr class="border-gray-700 my-2" />
        </div>
      </div>
      <p v-else class="text-center text-gray-400">팔로잉 사용자가 없습니다.</p>
    </template>
  </BaseModal>

  <!-- 팔로워 목록 모달 -->
  <BaseModal
    v-model:isOpen="isFollowersModalOpen"
    contentClass="w-full max-w-lg p-6"
  >
    <template #header>
      <h3 class="text-lg font-bold">팔로워 목록</h3>
    </template>
    <template #default>
      <div v-if="data.followerList && data.followerList.length">
        <div
          v-for="follower in data.followerList"
          :key="follower.memberId"
          class="py-3 cursor-pointer"
          @click="goToUserPage(follower.memberId)"
        >
          <div class="flex items-center">
            <BaseProfileImage :src="follower.profilePath" size="40px" />
            <p class="pl-4 text-white font-medium">{{ follower.nickname }}</p>
          </div>
          <hr class="border-gray-700 my-2" />
        </div>
      </div>
      <p v-else class="text-center text-gray-400">팔로워 사용자가 없습니다.</p>
    </template>
  </BaseModal>
</template>
