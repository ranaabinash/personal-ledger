import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/dashboard/Dashboard.vue'
import Login from '@/views/login/Login.vue'
import Register from '@/views/login/Register.vue'
import { useRootStore } from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const rootState = useRootStore()
  const loggedIn = localStorage.getItem('loggedIn') ?? ''
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedIn.length && to.name !== 'Login') {
      next({ name: 'Login' })
    } else next()
  } else {
    next()
  }
})

export default router
