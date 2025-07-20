<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  videoId: String,
  thumbnailUrl: String,
});

const isLoaded = ref(false);

const hasVideo = computed(() => !!props.videoId);
const hasThumbnail = computed(() => !!props.thumbnailUrl);

const thumbnailVisible = computed(() => {
  if (!hasVideo.value && hasThumbnail.value) return true;
  return !isLoaded.value;
});

let iframeLoaded = false;
let timeoutPassed = false;

const checkReady = () => {
  if (iframeLoaded && timeoutPassed) {
    isLoaded.value = true;
  }
};

const handleLoaded = () => {
  iframeLoaded = true;
  checkReady();
};

if (hasVideo.value && hasThumbnail.value) {
  setTimeout(() => {
    timeoutPassed = true;
    checkReady();
  }, 1200);
} else {
  isLoaded.value = true;
}
</script>

<template>
  <div
    v-if="hasVideo || hasThumbnail"
    class="absolute left-1/2 top-0 transform -translate-x-1/2 -z-10 w-[64vw] h-[50vh] overflow-hidden"
  >
    <iframe
      v-if="hasVideo"
      class="w-full h-full absolute top-0 left-0"
      :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&playlist=${videoId}&modestbranding=1`"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
      @load="handleLoaded"
    ></iframe>

    <div
      v-if="hasThumbnail"
      class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
      :style="{ backgroundImage: `url(${props.thumbnailUrl})` }"
      :class="{
        'opacity-100': thumbnailVisible,
        'opacity-0': !thumbnailVisible,
      }"
    ></div>

    <div
      class="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"
    ></div>
  </div>
</template>
