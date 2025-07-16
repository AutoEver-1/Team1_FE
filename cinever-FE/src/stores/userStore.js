import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(userInfo) {
      this.user = userInfo;
    },
    clearUser() {
      this.user = null;
    },
  },
  persist: true, // 로컬 스토리지에 저장
});
