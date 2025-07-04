import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '../services/auth.service'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const token = ref(localStorage.getItem('token'))
    const loading = ref(false)

    const isAuthenticated = computed(() => {
        if (!token.value) return false
        return isValidToken(token.value)
    })

    const isValidToken = (tokenValue) => {
        try {
            const parts = tokenValue.split('.')
            if (parts.length !== 3) return false

            const payload = JSON.parse(atob(parts[1]))
            if (!payload.exp) return false

            return payload.exp * 1000 > Date.now()
        } catch (error) {
            return false
        }
    }

    const login = async (credentials) => {
        try {
            loading.value = true
            const response = await authService.login(credentials)

            if (!isValidToken(response.data.accessToken)) {
                throw new Error('Invalid token received')
            }

            token.value = response.data.accessToken
            localStorage.setItem('token', token.value)
            ElMessage.success('Login successful!')
            router.push('/dashboard')
        } catch (err) {
            token.value = null
            localStorage.removeItem('token')
            ElMessage.error(err.response?.data?.message || err.message || 'Login failed')
        } finally {
            loading.value = false
        }
    }

    const logout = () => {
        token.value = null
        localStorage.removeItem('token')
        router.push('/login')
    }

    const checkAuth = (to) => {
        if (!isAuthenticated.value && to.meta.requiresAuth) {
            return '/login'
        }
        if (isAuthenticated.value && to.meta.requiresGuest) {
            return '/dashboard'
        }
        return true
    }

    return {
        token,
        loading,
        isAuthenticated,
        login,
        logout,
        checkAuth
    }
})