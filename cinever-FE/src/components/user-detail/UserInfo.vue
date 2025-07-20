<script setup>
import { computed, ref, watch } from "vue";
import BaseProfileImage from "../../components/common/BaseProfileImage.vue";
import BaseModal from "../../components/common/BaseModal.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  userInfo: Object,
  reviewCount: Number,
  isFollowing: Boolean,
});

const emit = defineEmits(["toggle-follow"]);

const imgSrc = ref(props.userInfo?.profilePath);

// 성별 라벨
const genderLabel = computed(() => {
  if (!props.userInfo?.gender) return "-";
  return props.userInfo.gender === "female" ? "여성" : "남성";
});

// 생일 포맷
const birthLabel = computed(() => {
  if (!props.userInfo?.birth) return "-";
  const date = new Date(props.userInfo.birth);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
});

// 모달 상태
const isFollowingModalOpen = ref(false);
const isFollowersModalOpen = ref(false);

const openFollowingModal = () => {
  isFollowingModalOpen.value = true;
};
const openFollowersModal = () => {
  isFollowersModalOpen.value = true;
};

const goToUserPage = (userId) => {
  router.push({
    name: "User",
    params: { id: userId },
    query: { tab: "profile" },
  });
};

watch(
  () => props.userInfo?.memberId,
  () => {
    isFollowingModalOpen.value = false;
    isFollowersModalOpen.value = false;
  }
);
</script>

<template>
  <div class="w-full max-w-4xl mx-auto px-6 pt-12 text-white" v-if="userInfo">
    <div class="flex flex-col md:flex-row items-center md:items-start gap-10">
      <BaseProfileImage :src="imgSrc" size="160px" />
      <div class="flex-1 w-full">
        <div class="flex items-center justify-between">
          <div class="flex flex-col gap-1">
            <h2 class="text-2xl font-bold">
              {{ userInfo.nickname }}
              <span
                class="ml-2 inline-block text-sm font-bold bg-amber-500 text-black px-2 py-0.5 rounded"
              >
                {{ userInfo.roleName }}
              </span>
            </h2>
            <p class="mt-1 text-sm font-semibold text-gray-500">
              {{ genderLabel }} · {{ birthLabel }}
            </p>
            <div class="flex flex-wrap gap-2 mt-3 justify-center">
              <span
                v-for="genre in userInfo.preferenceGenre"
                :key="genre"
                class="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white"
              >
                #{{ genre }}
              </span>
            </div>
          </div>

          <!-- 데스크탑 팔로우 버튼 -->
          <button
            class="hidden md:inline-block text-sm border border-white px-4 py-1.5 rounded hover:bg-white/10"
            @click="emit('toggle-follow')"
          >
            {{ isFollowing ? "팔로우 취소" : "+ 팔로우 하기" }}
          </button>
        </div>

        <!-- 모바일 팔로우 버튼 -->
        <div class="mt-4 md:hidden w-full flex justify-center">
          <button
            class="text-sm border border-white px-4 py-1.5 rounded hover:bg-white/10 w-1/2"
            @click="emit('toggle-follow')"
          >
            {{ isFollowing ? "팔로우 취소" : "+ 팔로우 하기" }}
          </button>
        </div>

        <!-- 통계 정보 -->
        <div
          class="grid grid-cols-4 gap-4 mt-10 text-center text-sm text-gray-400 md:mx-12"
        >
          <div>
            <p class="text-xl font-bold text-white">{{ reviewCount ?? "-" }}</p>
            <p>Reviews</p>
          </div>
          <div class="cursor-pointer" @click="openFollowingModal">
            <p class="text-xl font-bold text-white">
              {{ userInfo.followingCount ?? "-" }}
            </p>
            <p>Following</p>
          </div>
          <div class="cursor-pointer" @click="openFollowersModal">
            <p class="text-xl font-bold text-white">
              {{ userInfo.followerCount ?? "-" }}
            </p>
            <p>Followers</p>
          </div>
          <div>
            <p class="text-xl font-bold text-white">
              {{ userInfo.wishList?.length ?? "-" }}
            </p>
            <p>Wishlist</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 팔로잉 모달 -->
  <BaseModal
    v-model:isOpen="isFollowingModalOpen"
    contentClass="w-full max-w-lg p-6"
  >
    <template #header><h3 class="text-lg font-bold">팔로잉 목록</h3></template>
    <template #default>
      <div v-if="userInfo.followingList?.length">
        <div
          v-for="following in userInfo.followingList"
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

  <!-- 팔로워 모달 -->
  <BaseModal
    v-model:isOpen="isFollowersModalOpen"
    contentClass="w-full max-w-lg p-6"
  >
    <template #header><h3 class="text-lg font-bold">팔로워 목록</h3></template>
    <template #default>
      <div v-if="userInfo.followerList?.length">
        <div
          v-for="follower in userInfo.followerList"
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
