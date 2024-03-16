import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './components/LandingPage.vue'
import TodoApp from './components/TodoApp.vue'
import Login from  './components/Login.vue'
import Signup from './components/Signup.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/todo', component: TodoApp, meta: { requiresAuth: true } },
  { path: '/login', component: Login},
  { path: '/signup', component: Signup}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is authenticated
    const token = localStorage.getItem('token')
    if (token) {
      // User is authenticated, allow navigation
      next()
    } else {
      // User is not authenticated, redirect to the login page
      next({ path: '/login' })
    }
  } else {
    // Route does not require authentication, allow navigation
    next()
  }
})


export default router