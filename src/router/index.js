import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/template/Home'
import Carrinho from '@/components/carrinho/Carrinho'
import Cursos from '../components/admin/cursos/Cursos'
import Auth from '../components/auth/Authentication'

import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home'
  },
  {
    path: '/carrinho',
    component: Carrinho,
    name: 'Carrinho'
  },
  {
    path: '/admin/cursos',
    component: Cursos,
    name: 'AdminCursos',
    meta: { requiresAdmin: true }
  },
  {
    path: '/auth',
    component: Auth,
    name: 'Auth'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(rota => rota.meta.requiresAdmin)) {
    const usuarioLogado = localStorage.getItem(userKey)
    if (usuarioLogado) {
        const user = JSON.parse(usuarioLogado)
        user && user.admin ? next() : next( { name: 'Home' } )
    }
  } else {
    next()
  }
})


export default router
