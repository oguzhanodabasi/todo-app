import { ElMessage } from 'element-plus'

export function useNotification() {
    const showSuccess = (message) => {
        ElMessage.success(message)
    }

    const showError = (message) => {
        ElMessage.error(message)
    }

    return {
        showSuccess,
        showError
    }
}