<!-- TestWordCloud.vue -->
<template>
  <div class="w-full h-[400px] p-6 bg-black text-white">
    <div class="w-full h-full relative bg-white/10 rounded">
      <WordCloud
        :words="wordData"
        :color="() => '#FACC15'"
        :fontSizeMapper="(word) => word.weight * 5 + 12"
        :rotation="0"
        font="Arial"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import WordCloud from "vue3-word-cloud";

const wordData = ref([
  { text: "연출", weight: 10 },
  { text: "스토리", weight: 8 },
  { text: "연기", weight: 12 },
  { text: "OST", weight: 6 },
  { text: "긴장감", weight: 9 },
  { text: "감동", weight: 7 },
  { text: "지루함", weight: 4 },
  { text: "몰입감", weight: 11 },
  { text: "캐릭터", weight: 5 },
  { text: "전개", weight: 6 },
]);
</script>
