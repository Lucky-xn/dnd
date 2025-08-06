import { createRouter, createWebHistory } from 'vue-router'

import IniciativeTracker from '../views/Dm/IniciativeTracker.vue';
import Home from '../views/System/Home.vue';
import Personagens from '../views/System/Personagens.vue';

const routes = [
  { path: '/Campanha/Batalhas', component: IniciativeTracker, },
  { path: '/Persongens', component: Personagens, },
  { path: '/', component: Home, },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router