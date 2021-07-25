import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'juegos',
    component: () => import('pages/Index.vue'),
  },
  {
    path: '/desarrolladora/:desarrolladora',
    name: 'juegos-desarrolladora',
    component: () => import('pages/Index.vue'),
  },
  {
    path: '/genero/:genero',
    name: 'juegos-genero',
    component: () => import('pages/Index.vue'),
  },
  {
    path: '/search/:search',
    name: 'juegos-search',
    component: () => import('pages/Index.vue'),
  },
  {
    path: '/:juego',
    name: 'juego-unique',
    component: () => import('pages/Juego.vue'),
  },
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('pages/Login.vue'),
  },
  {
    path: '/form/add',
    name: 'add',
    component: () => import('pages/Add.vue'),
  },
  {
    path: '/form/update/:slug',
    name: 'update',
    component: () => import('pages/Update.vue'),
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/error/forbidden',
    name: 'forbidden',
    component: () => import('pages/Error403.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
