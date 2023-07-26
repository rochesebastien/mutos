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
    path: '/day',
    name: 'Day',
    component: Game,
    props: { mode: "day" }
  },
  {
    path: '/daysuite',
    name: 'DaySuite',
    component: Game,
    props: { mode: "daysuite" }
  },
  {
    path: '/infinite',
    name: 'Infinite',
    component: Game,
    props: { mode: "infinite" }
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
