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
import { login } from "../api/auth";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";

const router = useRouter();

const form = reactive({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  const userStore = useUserStore();

  try {
    if (!form.email || !form.password) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    console.log(form);

    const response = await login(form);
    console.log("서버 응답:", response);
    if (response.status >= 200 && response.status < 300) {
      const userData = await response.data;
      userStore.setUser(userData);
      alert(`로그인 완료: ${form.email}`);

      router.push("/"); // 로그인 성공 후 홈으로 리다이렉트
    } else {
      alert("로그인에 실패했습니다. 다시 확인해주세요.");
    }
  } catch (error) {
    console.error("로그인 실패:", error);
    alert("로그인에 실패했습니다. 다시 시도해주세요.");
  }
};
</script>
