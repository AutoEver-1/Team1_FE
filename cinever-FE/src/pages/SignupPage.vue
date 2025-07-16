<template>
  <div
    class="w-[384px] max-h-[468px] p-8 pb-5 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg"
  >
    <h2 class="text-2xl font-extrabold text-white/90 mb-8">회원가입</h2>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
      <!-- 1단계: 이메일, 비밀번호 -->
      <SignupStep1
        v-if="step === 1"
        v-model:form="form"
        @next="handleNextStep"
      />
      <!-- 2단계: 이름, 닉네임, 생일 -->
      <SignupStep2 v-else v-model:form="form" />
    </form>

    <!-- 고정 영역 -->
    <div class="mt-4 flex flex-col gap-3">
      <Divider />
      <GoogleLoginBtn />
      <LoginRedirect />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, toRaw } from "vue";
import SignupStep1 from "../components/signup/SignupStep1.vue";
import SignupStep2 from "../components/signup/SignupStep2.vue";
import Divider from "../components/signup/Divider.vue";
import GoogleLoginBtn from "../components/auth/GoogleLoginBtn.vue";
import LoginRedirect from "../components/signup/LoginRedirect.vue";
import { signup } from "../api/auth";

const step = ref(1);

const form = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  gender: "",
  birthday: "",
});

const handleNextStep = () => {
  console.log(toRaw(form));
  if (!form.email || !form.password || !form.confirmPassword) {
    alert("모든 항목을 입력해주세요.");
    return;
  }
  if (form.password !== form.confirmPassword) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }
  step.value = 2;
};

const handleSubmit = async () => {
  try {
    if (
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.name ||
      !form.gender ||
      !form.birthday
    ) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    const response = await signup(form);
    alert(`가입 완료: ${form.name} (${form.email})`);
    console.log("서버 응답:", response);
  } catch (error) {
    console.error("회원가입 실패:", error);
    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
  }
};
</script>
