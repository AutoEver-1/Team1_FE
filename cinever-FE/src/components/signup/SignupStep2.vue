<template>
  <div class="flex flex-col gap-3">
    <BaseAuthInput
      label="이름"
      id="name"
      placeholder="이름을 입력해주세요."
      v-model="form.name"
    />
    <div class="flex flex-col gap-1">
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
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-xs text-white/90">생일</label>
      <div class="datepicker-wrapper">
        <Datepicker
          placeholder="생일을 선택해주세요"
          v-model="form.birthday"
          :enable-time-picker="false"
          :format="'yyyy-MM-dd'"
          :teleport="false"
          :auto-apply="true"
          :max-date="new Date()"
          :min-date="new Date('1900-01-01')"
          :week-start="0"
        />
      </div>
    </div>

    <button
      type="submit"
      class="w-full mt-3 py-2 bg-amber-500 text-sm text-amber-900 font-semibold rounded hover:bg-amber-600 focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-200 transition"
    >
      회원가입
    </button>
  </div>
</template>

<script setup>
import { watch } from "vue";
import BaseAuthInput from "../common/BaseAuthInput.vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
  form: Object,
});

const emit = defineEmits(["update:form"]);

watch(
  props.form,
  () => {
    emit("update:form", props.form);
  },
  { deep: true }
);
</script>

<style>
/* 달력 테두리 */
.datepicker-wrapper {
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 0.25rem;
  transition: border-color 0.2s ease;
}

/* focus시 테두리 강조 */
.datepicker-wrapper:focus-within {
  border-color: #fbbf24;
  box-shadow: 0 0 0 0.6px #fbbf24; /* ring처럼 보이게 */
}

/* 달력 입력 창 */
.dp__input {
  width: 100%;
  background-color: rgba(26, 19, 11, 0.5) !important;
  color: rgba(255, 255, 255, 0.9) !important;
  font-size: 0.8rem !important;
  border: none;
  padding-top: 0.25rem !important;
  padding-bottom: 0.25rem !important;
}

/* 달력 입력 창 placeholder */
.dp__input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

/* 전체 달력 크기 */
.dp__menu {
  transform: scale(0.85);
  /* 크기 축소 */
  transform-origin: top left;
}

/* 내부 글자 크기 */
.dp__menu_inner {
  font-size: 13px;
}
</style>
