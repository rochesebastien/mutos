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
>>>>>>> f54e77d14a348e60512525fb4e67f2c1fbee1bcd
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
