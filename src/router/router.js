import { createRouter, createWebHistory } from 'vue-router'

import IniciativeTracker from '../views/Dm/IniciativeTracker.vue';

const routes = [
  { path: '/', component: IniciativeTracker, },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router