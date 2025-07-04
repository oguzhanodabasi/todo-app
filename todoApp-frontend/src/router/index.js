import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import BoardDetail from '../views/BoardDetail.vue'
import { useAuthStore } from '../store/auth'

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
            meta: { requiresGuest: true }
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: DashboardView,
            meta: { requiresAuth: true }
        },
        {
            path: '/board/:id',
            name: 'BoardDetail',
            component: BoardDetail,
            meta: { requiresAuth: true }
        }
    ],
})

// Navigation Guard - Vue Router
router.beforeEach((to, from, next) => {
    const auth = useAuthStore()

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        next('/login')
    } else if (to.meta.requiresGuest && auth.isAuthenticated) {
        next('/dashboard')
    } else {
        next()
    }
})

export default router
