<template>
  <div class="flex flex-col gap-3">
    <BaseAuthInput
      label="이메일"
      id="email"
      type="email"
      placeholder="이메일을 입력해주세요."
      v-model="form.email"
    />
    <BaseAuthInput
      label="비밀번호"
      id="password"
      type="password"
      placeholder="비밀번호를 입력해주세요."
      v-model="form.password"
    />
    <button
      type="submit"
      class="w-full mt-3 py-2 bg-amber-500 text-sm text-amber-900 font-semibold rounded hover:bg-amber-600 focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-200 transition"
    >
      로그인
    </button>
  </div>
</template>

<script setup>
import { watch } from "vue";
import BaseAuthInput from "../common/BaseAuthInput.vue";

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
