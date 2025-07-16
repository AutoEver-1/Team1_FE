<script setup>
import BaseButton from "../common/BaseButton.vue";
import BaseInput from "../common/BaseInput.vue";
import BaseSelectbox from "../common/BaseSelectbox.vue";
import { ref, onMounted } from "vue";

const keyword = ref("");
const videoRef = ref(null);

const searchOption = [{ name: "제목" }, { name: "배우" }, { name: "감독" }];

onMounted(() => {
  if (videoRef.value) videoRef.value.playbackRate = 0.7;
});
</script>

<template>
  <video
    ref="videoRef"
    autoplay
    muted
    loop
    playsinline
    class="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30"
  >
    <source src="../../assets/background.mp4" type="video/mp4" />
  </video>

  <div
    class="relative z-10 flex flex-col items-center justify-center min-h-[100vh] text-white px-4"
  >
    <div class="w-full max-w-5xl">
      <h1
        class="text-4xl sm:text-4xl md:text-7xl lg:text-8xl font-extrabold leading-tight drop-shadow-md text-center md:text-left"
      >
        보고싶은 영화를<br />검색해보세요
      </h1>

      <div class="flex flex-col md:flex-row mt-6 md:mt-12 gap-3 w-full">
        <BaseSelectbox :option="searchOption" class="w-full md:w-[20%]" />
        <BaseInput
          v-model="keyword"
          placeholder="제목이나 배우를 검색하세요"
          inputClass="w-full border-amber-400 bg-[#12100E] py-3 px-4 bg-opacity-70 text-sm md:text-base"
        />
        <BaseButton
          label="검색"
          class="w-full md:w-[12%] h-[42px] md:h-auto bg-amber-400 hover:bg-amber-500 text-black"
          @click="console.log(keyword)"
        />
      </div>
    </div>
  </div>
</template>
