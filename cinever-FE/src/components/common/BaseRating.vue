<script setup>
const props = defineProps({
  score: {
    type: Number,
    required: true,
  },
  size: {
    type: [String, Number],
    default: 16,
  },
  color: {
    type: String,
    default: "#fbbf24",
  },
  uid: {
    type: [String, Number],
    default: () => Math.random().toString(36).slice(2, 8),
  },
});

const getFillPercent = (n) => {
  const s = Math.min(props.score, 5);
  const full = Math.floor(s);
  if (n <= full) return 100;
  if (n === full + 1) return (s % 1) * 100;
  return 0;
};
</script>

<template>
  <div class="flex items-center gap-[2px]">
    <template v-for="n in 5" :key="n">
      <svg
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            :id="`star-${uid}-${n}`"
            x1="0"
            x2="100%"
            y1="0"
            y2="0"
          >
            <stop offset="0%" :stop-color="color" />
            <stop :offset="`${getFillPercent(n)}%`" :stop-color="color" />
            <stop :offset="`${getFillPercent(n)}%`" stop-color="transparent" />
            <stop offset="100%" stop-color="transparent" />
          </linearGradient>
        </defs>
        <path
          :fill="`url(#star-${uid}-${n})`"
          :stroke="color"
          stroke-width="1"
          d="M12 17.27L18.18 21 16.54 13.97 22 9.24
             l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
    </template>
  </div>
</template>
