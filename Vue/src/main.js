import { createApp } from "vue";

import "./style.css";
import App from "./App.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/medications", component: Medications },
];

createApp(App).mount("#app");
