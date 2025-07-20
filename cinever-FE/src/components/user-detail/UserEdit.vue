<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";
import BaseModal from "../common/BaseModal.vue";
import BaseProfileImage from "../common/BaseProfileImage.vue";
import BaseAuthInput from "../common/BaseAuthInput.vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Profile from "../../assets/images/default_profile.png";

// 부모로부터 모달 열림 상태를 받음
const props = defineProps({
  isUserModalOpen: Boolean,
});

// 부모에게 모달 상태 변경 이벤트를 보냄
const emit = defineEmits(["update:isUserModalOpen"]);

const form = ref({
  nickname: "",
  // gender: "",
  // birth: "",
  profileImageFile: null,
});

const imgSrc = ref(null);

// 모달 상태 로컬 복사
const localIsOpen = ref(props.isUserModalOpen);

// 부모가 상태를 바꾸면 로컬 상태 동기화
watch(
  () => props.isUserModalOpen,
  (newVal) => {
    localIsOpen.value = newVal;
  }
);

// 로컬 상태 바뀌면 부모에게 알림
watch(localIsOpen, (newVal) => {
  emit("update:isUserModalOpen", newVal);
});

// 프로필 사진 변경
const onProfileImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.value.profileImageFile = file;
    const reader = new FileReader();
    reader.onload = (event) => {
      imgSrc.value = event.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const saveProfile = () => {
  console.log("프로필 저장", form.value);
  localIsOpen.value = false; // 모달 닫기
};
</script>

<template>
  <BaseModal
    v-model:isOpen="localIsOpen"
    contentClass="w-full max-w-lg p-6 bg-[#1f1e1b] rounded-xl"
  >
    <template #header>
      <h3 class="text-lg font-bold text-white">프로필 수정</h3>
    </template>

    <template #default>
      <div class="flex flex-col gap-6">
        <div class="flex flex-col items-center gap-2">
          <BaseProfileImage :src="imgSrc || Profile" size="100px" />
          <label
            class="text-xs text-amber-400 cursor-pointer underline"
            for="profileUpload"
          >
            프로필 사진 변경
          </label>
          <input
            type="file"
            id="profileUpload"
            class="hidden"
            @change="onProfileImageChange"
          />
        </div>

        <BaseAuthInput
          label="닉네임"
          id="nickname"
          placeholder="닉네임을 입력해주세요."
          v-model="form.nickname"
        />

        <!-- <div class="flex flex-col gap-1">
          <label class="text-xs text-white/90">성별</label>
          <div class="flex gap-2">
            <button
              v-for="option in ['남성', '여성']"
              :key="option"
              type="button"
              @click="form.gender = option"
              :class="[
                'px-5 py-1.5 rounded text-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-500',
                form.gender === option
                  ? 'font-bold bg-amber-500 border border-amber-500 text-amber-900'
                  : 'font-normal border border-white/50 hover:bg-white/20 text-white/50',
              ]"
            >
              {{ option }}
            </button>
          </div>
        </div> -->

        <!-- <div class="flex flex-col gap-1">
          <label class="text-xs text-white/90">생일</label>
          <div class="datepicker-wrapper">
            <Datepicker
              placeholder="생일을 선택해주세요"
              v-model="form.birth"
              :enable-time-picker="false"
              :format="'yyyy-MM-dd'"
              :teleport="false"
              :auto-apply="true"
              :max-date="new Date()"
              :min-date="new Date('1900-01-01')"
              :week-start="0"
            />
          </div>
        </div> -->
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2">
        <button
          @click="localIsOpen = false"
          class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
        >
          취소
        </button>
        <button
          @click="saveProfile"
          class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg"
        >
          저장
        </button>
      </div>
    </template>
  </BaseModal>
</template>
