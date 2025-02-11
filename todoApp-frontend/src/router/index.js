import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginView,
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: DashboardView,
            meta: { requiresAuth: true }
        }
    ],
})

// Navigation Guard - Vue Router
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token')

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})

export default router
