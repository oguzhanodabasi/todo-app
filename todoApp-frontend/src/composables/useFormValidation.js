import { ref } from 'vue'

export function useFormValidation() {
    const formRef = ref(null)

    const validateForm = async () => {
        if (!formRef.value) return false

        try {
            await formRef.value.validate()
            return true
        } catch (error) {
            return false
        }
    }

    const resetForm = () => {
        if (formRef.value) {
            formRef.value.resetFields()
        }
    }

    const clearValidation = (props) => {
        if (formRef.value) {
            formRef.value.clearValidate(props)
        }
    }

    return {
        formRef,
        validateForm,
        resetForm,
        clearValidation
    }
}