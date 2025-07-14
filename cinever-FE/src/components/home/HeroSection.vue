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
    class="relative z-10 flex flex-col items-center justify-center min-h-[100vh] text-white"
  >
    <div class="w-[70%]">
      <h1 class="text-[96px] font-extrabold leading-tight drop-shadow-md">
        보고싶은 영화를<br />검색해보세요
      </h1>
      <div class="flex mt-12 w-full gap-3 items-center">
        <BaseSelectbox :option="searchOption" class="w-[15%]" />
        <BaseInput
          v-model="keyword"
          placeholder="보고싶은 영화의 제목이나 배우를 검색해보세요"
          inputClass="w-[90%] border-amber-400 bg-[#12100E] py-2 px-4 bg-opacity-70"
        />
        <BaseButton
          label="검색"
          class="w-[10%] bg-amber-400 hover:bg-amber-500 text-black"
          @click="console.log(keyword)"
        />
      </div>
    </div>
  </div>
</template>
