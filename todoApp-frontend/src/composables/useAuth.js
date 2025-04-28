import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/auth.service'
import { useNotification } from './useNotification'
import { useTokenStorage } from './useTokenStorage'

export function useAuth() {
  const router = useRouter()
  const loading = ref(false)
  const { showSuccess, showError } = useNotification()
  const { setToken } = useTokenStorage()

  const login = async (credentials) => {
    try {
      loading.value = true
      const response = await authService.login(credentials)
      setToken(response.data.accessToken)

      showSuccess('Login successful!')
      router.push('/dashboard')
    } catch (err) {
      if (err.response) {
        showError(err.response.data.message || 'Login failed')
      } else {
        showError('Connection failed')
      }
    } finally {
      loading.value = false
    }
  }

  return {
    login,
    loading
  }
}