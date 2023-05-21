import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Settings from './views/Settings.vue'
import Rules from './views/Rules.vue'
import Game from './views/Game.vue'
import Error from './views/Error.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/game/day',
    component: Game,
    props: { mode: 'day' }
  },
  {
    path: '/game/suite',
    component: Game,
    props: { mode: 'suite' }
  },
  {
    path: '/game/infinite',
    component: Game,
    props: { mode: 'infinite' }
  },
  {
    path: '/settings',
    component: Settings
  },
  {
    path: '/rules',
    component: Rules
  },
  {
    path: '',
    component: Home
  },
  {
    path: '/',
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
