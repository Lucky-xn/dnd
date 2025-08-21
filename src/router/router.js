import { createRouter, createWebHistory } from 'vue-router'

import IniciativeTracker from '../views/Dm/IniciativeTracker.vue';
import Home from '../views/System/Home.vue';
import Characters from '../views/System/Characters.vue';
import CharacterSheet from '../views/System/CharacterSheet.vue';

const routes = [
  { path: '/Campanha/Batalhas', component: IniciativeTracker, },
  { path: '/Personagens', component: Characters, },
  { path: '/Personagens/:id', component: CharacterSheet, },
  { path: '/', component: Home, },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router