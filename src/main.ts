import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia, PiniaVuePlugin } from 'pinia';
import routes from 'virtual:generated-pages';
import FloatingVue from 'floating-vue';
import App from './App.vue';

import 'floating-vue/dist/style.css';
import '@unocss/reset/tailwind.css';
import './styles/main.css';

import 'uno.css';

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
app.use(router);
app.use(FloatingVue);

const pinia = createPinia();
app.use(pinia);

app.mount('#app');

