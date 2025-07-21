<template>
  <div class="h-screen flex text-gray-900 bg-gray-50">
    <aside
      class="w-64 bg-white border-r h-full fixed top-0 left-0 z-50 shadow-sm"
    >
      <div class="flex items-center justify-center h-16 border-b">
        <img
          src="../assets/images/logo.png"
          class="h-6 sm:h-7 cursor-pointer"
          @click="handleClick"
        />
      </div>
      <nav class="flex flex-col mt-4 px-4 gap-2 text-sm">
        <RouterLink
          to="/admin/reviewer"
          class="px-4 py-2 rounded hover:bg-amber-100 text-center"
          active-class="bg-amber-200 font-semibold"
        >
          리뷰어 관리
        </RouterLink>
        <RouterLink
          to="/admin/review"
          class="px-4 py-2 rounded hover:bg-amber-100 text-center"
          active-class="bg-amber-200 font-semibold"
        >
          리뷰 관리
        </RouterLink>
        <RouterLink
          to="/admin/statistics"
          class="px-4 py-2 rounded hover:bg-amber-100 text-center"
          active-class="bg-amber-200 font-semibold"
        >
          통계
        </RouterLink>
      </nav>
    </aside>

    <div class="ml-64 w-[calc(100%-16rem)] h-full flex flex-col">
      <header
        class="h-16 bg-white border-b shadow-sm flex justify-end items-center px-6 shrink-0"
      >
        <div class="flex items-center gap-2 pt-2">
          <img
            src="https://postfiles.pstatic.net/20140606_111/sjinwon2_1402052862659ofnU1_PNG/130917_224626.png?type=w3840"
            alt="Admin"
            class="w-8 h-8 rounded-full object-cover"
          />
          <span class="font-semibold text-sm pb-1">
            MANAGER <span class="text-xs text-amber-500"></span>
          </span>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const handleClick = () => {
  router.push("/");
};
</script>
