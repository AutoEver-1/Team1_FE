import { createApp } from "vue";
import App from "./App.vue";
import "./assets/styles/main.css";
import router from "./router";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

// Pinia 플러그인 연결
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(pinia).use(router).mount("#app");
