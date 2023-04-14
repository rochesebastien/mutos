import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Settings from './views/Settings.vue'
import Rules from './views/Rules.vue'
import Game from './views/Game.vue'
import Error from './views/Error.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/rules',
    name: 'Rules',
    component: Rules
  },
  {
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    // Route pour l'erreur 404
    path: '/:catchAll(.*)',
    name: 'Error',
    component: Error
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
