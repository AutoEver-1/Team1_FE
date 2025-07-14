<script setup>
import { getFamous } from "../../api/movieApi";
import { ref, onMounted } from "vue";

const famous = ref("");

onMounted(async () => {
  const res = await getFamous();
  famous.value = res.data.content;
  // console.log(res);
});
</script>
<template>
  <div
    class="relative z-10 flex flex-col items-center justify-center min-h-[100vh] text-white pt-16"
  >
    <div class="w-[70%]">
      <div class="relative z-10">
        <p class="text-white text-[300%] font-bold mb-4">이 대사 기억나 ?</p>

        <blockquote
          class="text-yellow-400 text-[500%] font-extrabold leading-snug mb-16"
        >
          {{ famous }}
        </blockquote>

        <div class="text-right">
          <RouterLink
            to="/movie"
            class="inline-block bg-yellow-400 hover:bg-yellow-500 text-black text-xl font-bold px-6 py-3 rounded transition"
          >
            영화보러가기 →
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
