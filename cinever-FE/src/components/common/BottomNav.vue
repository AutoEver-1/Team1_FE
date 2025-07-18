<template>
  <nav
    class="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-zinc-800 shadow-inner z-50"
  >
    <ul class="flex justify-around items-center h-[68px]">
      <li
        v-for="item in navItems"
        :key="item.name"
        class="flex-1 flex justify-center"
      >
        <button
          class="flex flex-col items-center transition-transform duration-150 active:scale-90"
          :class="{
            'text-yellow-400': current === item.name,
            'text-gray-400': current !== item.name,
          }"
          @click="$emit('navigate', item.name)"
        >
          <component :is="item.icon" class="w-6 h-6 mb-1" />
          <span class="text-xs">{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import {
  HomeIcon,
  TrophyIcon,
  ChatBubbleBottomCenterTextIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/vue/24/solid";

defineProps({
  current: String,
});

const navItems = [
  { name: "home", label: "홈", icon: HomeIcon },
  { name: "top100", label: "랭킹", icon: TrophyIcon },
  { name: "feed", label: "피드", icon: ChatBubbleBottomCenterTextIcon },
  { name: "review", label: "리뷰어", icon: SparklesIcon },
  { name: "profile", label: "프로필", icon: UserIcon },
];
</script>
