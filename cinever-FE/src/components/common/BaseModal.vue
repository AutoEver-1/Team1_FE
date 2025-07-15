<script setup>
import { onMounted, onUnmounted } from "vue";

const props = defineProps({
  isOpen: Boolean,
  contentClass: {
    type: String,
    default: "w-full max-w-md p-6",
  },
});
const emit = defineEmits(["update:isOpen"]);

const emitClose = () => emit("update:isOpen", false);

const handleEscape = (e) => {
  if (e.key === "Escape") emitClose();
};

onMounted(() => {
  window.addEventListener("keydown", handleEscape);
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleEscape);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center px-4"
        @click.self="emitClose"
      >
        <Transition name="scale-fade">
          <div
            v-show="isOpen"
            :class="[
              'relative bg-[#1e1e1e] text-white rounded-lg shadow-2xl',
              contentClass,
            ]"
          >
            <button
              @click="emitClose"
              class="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              aria-label="Close"
            >
              &times;
            </button>

            <!-- 헤더 -->
            <header v-if="$slots.header" class="mb-4">
              <slot name="header" />
            </header>

            <!-- 콘텐츠 -->
            <section
              v-if="$slots.default"
              class="text-sm leading-relaxed text-gray-200"
            >
              <slot />
            </section>

            <!-- 푸터 -->
            <footer v-if="$slots.footer" class="mt-6 flex justify-end gap-3">
              <slot name="footer" />
            </footer>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: all 0.25s ease;
}
.scale-fade-enter-from,
.scale-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
