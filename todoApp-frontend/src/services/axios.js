import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8001/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor
api.interceptors.request.use(
    config => {
        console.log('Request:', {
            url: config.url,
            method: config.method,
            data: config.data,
            headers: config.headers
        })
        return config
    },
    error => {
        console.error('Request Error:', error)
        return Promise.reject(error)
    }
)

// Response interceptor
api.interceptors.response.use(
    response => {
        console.log('Response:', {
            status: response.status,
            data: response.data
        })
        return response
    },
    error => {
        console.error('Response Error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        })
        return Promise.reject(error)
    }
)

export default api
