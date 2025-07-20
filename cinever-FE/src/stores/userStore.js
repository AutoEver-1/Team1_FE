// stores/userStore.js 또는 userStore.ts
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    setUser(userInfo) {
      this.user = userInfo;
      this.token = userInfo.token || null;
    },
    clearUser() {
      this.user = null;
      this.token = null;
    },
  },
  persist: true, // 로컬스토리지 저장
});
