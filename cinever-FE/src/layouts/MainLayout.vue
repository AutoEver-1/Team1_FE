<script setup>
import Header from "../components/common/Header.vue";
import Footer from "../components/common/Footer.vue";
import BottomNav from "../components/common/BottomNav.vue";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const isLargeHeader = ref(false);
const route = useRoute();
const router = useRouter();
const currentTab = ref("home");

const navigateTo = (tab) => {
  currentTab.value = tab;
  router.push(`/${tab}`);
};

watch(
  () => route.path,
  (newPath) => {
    if (newPath !== "/") {
      isLargeHeader.value = false;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="min-h-screen bg-[#12100E] text-white">
    <Header :isLarge="isLargeHeader" />
    <main>
      <router-view @hero-visible="isLargeHeader = $event" />
    </main>
    <Footer
      class="hidden lg:block"
      v-if="route.path != '/home' && route.path != '/'"
    />
    <BottomNav
      class="block lg:hidden"
      :current="currentTab"
      @navigate="navigateTo"
    />
  </div>
</template>
