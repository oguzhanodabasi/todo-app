import api from './axios'

export const authService = {
    login(credentials) {
        return api.post('/auth/login', credentials)
    }
}
