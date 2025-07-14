<template>
  <div
    class="w-[384px] max-h-[406px] p-8 pb-5 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg"
  >
    <h2 class="text-2xl font-extrabold text-white/90 mb-8">로그인</h2>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
      <!-- 1단계: 이메일, 비밀번호 -->
      <LoginForm v-model:form="form" />
    </form>

    <!-- 고정 영역 -->
    <div class="mt-4 flex flex-col gap-3">
      <Divider />
      <GoogleLoginBtn />
      <SignupRedirect />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, toRaw } from "vue";
import LoginForm from "../components/login/LoginForm.vue";
import Divider from "../components/signup/Divider.vue";
import GoogleLoginBtn from "../components/auth/GoogleLoginBtn.vue";
import SignupRedirect from "../components/login/SignupRedirect.vue";

const form = reactive({
  email: "",
  password: "",
});

const handleSubmit = () => {
  if (!form.email || !form.password) {
    alert("모든 정보를 입력해주세요.");
    return;
  }
  alert(`가입 완료: ${form.email}`);
  console.log(toRaw(form));
};
</script>
