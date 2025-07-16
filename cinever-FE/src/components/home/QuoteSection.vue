<script setup>
import { getFamous } from "../../api/movieApi";
import { ref, onMounted } from "vue";

const famous = ref("");

onMounted(async () => {
  const res = await getFamous();
  famous.value = res.data.content;
});
</script>

<template>
  <div
    class="relative z-10 flex flex-col items-center justify-center min-h-[100vh] text-white pt-16"
  >
    <div class="w-full max-w-4xl px-4">
      <div class="relative z-10">
        <p
          class="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center md:text-left"
        >
          이 대사 기억나 ?
        </p>

        <blockquote
          class="text-amber-400 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-snug mb-12 text-center md:text-left"
        >
          {{ famous }}
        </blockquote>

        <div class="text-center md:text-right">
          <RouterLink
            to="/movie"
            class="inline-block bg-amber-400 hover:bg-amber-500 text-black text-base sm:text-lg md:text-xl font-bold px-6 py-3 rounded transition"
          >
            영화보러가기 →
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
