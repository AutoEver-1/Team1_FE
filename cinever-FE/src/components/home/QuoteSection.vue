<template>
  <div
    class="relative z-10 flex flex-col items-center justify-center min-h-[100vh] text-white pt-16"
  >
    <div class="w-[70%]">
      <div class="relative z-10">
        <p class="text-white text-[48px] font-bold mb-4">이 대사 기억나 ?</p>

        <blockquote
          class="text-yellow-400 text-[84px] font-extrabold leading-snug mb-16"
        >
          “호의가 계속되면<br />
          그게 권리인 줄 알아요.”
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
