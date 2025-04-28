import api from './axios'

const mockUsers = [
    {
        username: 'test',
        password: '123456',
        token: 'mock-token-123',
        user: {
            id: 1,
            username: 'testuser'
        }
    }
]

export const authService = {
    login(credentials) {
        // Development ortamında mock response döndür
        if (!import.meta.env.PROD) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const user = mockUsers.find(
                        u => u.username === credentials.username &&
                            u.password === credentials.password
                    )

                    if (user) {
                        resolve({
                            data: {
                                accessToken: user.token,
                                user: user.user
                            }
                        })
                    } else {
                        reject({
                            response: {
                                status: 401,
                                data: {
                                    message: 'Invalid credentials'
                                }
                            }
                        })
                    }
                }, 1000)
            })
        }
        // Production ortamında gerçek API çağrısı yap
        return api.post('/auth/login', credentials)
    }
}