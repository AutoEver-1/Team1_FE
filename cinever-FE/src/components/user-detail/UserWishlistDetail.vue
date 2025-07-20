<script setup>
import MiniCardList from "../top100/MiniCardList.vue";

const props = defineProps({
  wishlistList: Object,
});
</script>

<template>
  <MiniCardList :filteredMovies="wishlistList.movieList" />
</template>
