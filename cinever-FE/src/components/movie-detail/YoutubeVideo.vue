<script setup>
defineProps({
  videoId: String,
});
</script>

<template>
  <div class="absolute left-1/2 top-0 transform -translate-x-1/2 -z-10">
    <iframe
      class="w-[64vw] h-[50vh] w"
      :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&playlist=${videoId}&modestbranding=1`"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe>
    <div
      class="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
    ></div>
  </div>
</template>
