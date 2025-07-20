<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getUserInfo } from "../../api/user";
import BaseBadge from "../../components/common/BaseBadge.vue";
import BaseModal from "../../components/common/BaseModal.vue";
import { useUserStore } from "../../stores/userStore";
import { PencilIcon, UserIcon } from "@heroicons/vue/24/solid";

// 라우터 및 사용자 스토어 준비
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

// 유저 프로필 사진
const fileInput = ref(null);

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

const onIconClick = () => {
  fileInput.value?.click();
};

const onFileChange = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    console.log("선택된 파일:", file);
    // TODO: 업로드 처리 로직 (서버 전송, 미리보기 등)
  }
};
</script>

<template>
  <!-- 사용자 프로필 컨테이너 -->
  <div
    class="max-w-4xl mx-auto bg-white/20 backdrop-blur-lg rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6"
  >
    <!-- 프로필 사진 -->
    <div class="relative flex-shrink-0">
      <img
        v-if="data.profilePath === '1'"
        :src="data.profilePath"
        alt="profile_img"
        class="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/50 shadow-lg"
      />
      <UserIcon
        v-else
        class="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/50 shadow-lg text-gray-300 bg-white/10 p-4"
      />

      <!-- 연필 아이콘 버튼 -->
      <button
        v-if="isOwnProfile"
        @click="onIconClick"
        class="absolute bottom-2 right-2 bg-white/95 rounded-full p-1 shadow-md hover:bg-gray-300 transition"
        type="button"
        aria-label="프로필 사진 변경"
      >
        <PencilIcon class="w-6 h-6 p-1 text-gray-500" />
      </button>

      <!-- 숨겨진 파일 입력 -->
      <input
        v-if="isOwnProfile"
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="onFileChange"
      />
    </div>

    <!-- 사용자 기본 정보 및 버튼 -->
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
      <div class="mt-2">
        <BaseBadge :dataList="data.preferenceGenre" index="#" />
      </div>

      <!-- 본인 프로필이면 '수정하기', 아니면 '팔로우 하기' -->
      <button
        v-if="isOwnProfile"
        class="w-full mt-4 inline-block border border-white rounded-md hover:backdrop-blur-lg text-white font-semibold py-2 px-4"
      >
        수정하기
      </button>
      <button
        v-else
        class="w-full mt-4 inline-block border border-white rounded-md hover:backdrop-blur-lg text-white font-semibold py-2 px-4"
      >
        팔로우 하기
      </button>
    </div>

    <!-- 리뷰/팔로잉/팔로워 카운트 -->
    <div class="flex gap-6 text-center text-white text-xs sm:text-sm h-auto">
      <!-- 리뷰 수 -->
      <div>
        <p class="text-xl font-bold">{{ data.reviewCount || 0 }}</p>
        <p>Reviews</p>
      </div>
      <!-- 팔로잉 (클릭 시 모달) -->
      <div class="cursor-pointer" @click="openFollowingModal">
        <p class="text-xl font-bold">{{ data.followingCount || 0 }}</p>
        <p>Following</p>
      </div>
      <!-- 팔로워 (클릭 시 모달) -->
      <div class="cursor-pointer" @click="openFollowersModal">
        <p class="text-xl font-bold">{{ data.followerCount || 0 }}</p>
        <p>Followers</p>
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
          :key="following.id"
          class="py-3 cursor-pointer"
          @click="goToUserPage(following.memberId)"
        >
          <div class="flex items-center">
            <img
              :src="following.profilePath"
              alt="팔로잉 사진"
              class="w-12 h-12 rounded-full object-cover"
            />
            <p class="pl-5">{{ following.nickname }}</p>
          </div>
          <hr class="border-gray-600 my-2" />
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
          :key="follower.id"
          class="py-3 cursor-pointer"
          @click="goToUserPage(follower.memberId)"
        >
          <div class="flex items-center">
            <img
              :src="follower.profilePath"
              alt="팔로워 사진"
              class="w-12 h-12 rounded-full object-cover"
            />
            <p class="pl-5">{{ follower.nickname }}</p>
          </div>
          <hr class="border-gray-600 my-2" />
        </div>
      </div>
      <p v-else class="text-center text-gray-400">팔로워 사용자가 없습니다.</p>
    </template>
  </BaseModal>
</template>
