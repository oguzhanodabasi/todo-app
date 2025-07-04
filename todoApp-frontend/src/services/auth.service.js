import api from './axios'

// Base64 encode fonksiyonu
const base64Encode = (obj) => btoa(JSON.stringify(obj))

// Header ve payload'u base64 ile encode et
const header = base64Encode({ alg: "HS256", typ: "JWT" })
const payload = base64Encode({ exp: 9999999999 })
const signature = 'signature'

const mockToken = `${header}.${payload}.${signature}`
//console.log(mockToken)

const mockUsers = [
    {
        username: 'test',
        password: '123456',
        token: mockToken,
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