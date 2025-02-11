<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { authService } from '../services/auth.service.js'

const router = useRouter()
const formRef = ref(null)
const loading = ref(false)

const formData = reactive({
  username: '',
  password: '',
})

const rules = {
  username: [
    { required: true, message: 'Username is required', trigger: 'blur' },
    { min: 3, message: 'Minimum 3 characters', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { min: 6, message: 'Minimum 6 characters', trigger: 'blur' },
  ],
}

const handleLogin = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true

    const response = await authService.login({
      username: formData.username,
      password: formData.password,
    })

    localStorage.setItem('token', response.accessToken)

    ElMessage.success('Login successful!')
    router.push('/dashboard')
  } catch (err) {
    if (err.response) {
      ElMessage.error(err.response.data.message || 'Login failed')
    } else if (!err.response) {
      ElMessage.error('Connection failed')
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">Login</h2>
      <el-form :model="formData" :rules="rules" ref="formRef">
        <el-form-item prop="username">
          <el-input
            v-model="formData.username"
            autocomplete="off"
            placeholder="Username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="formData.password"
            autocomplete="off"
            placeholder="Password"
            show-password
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="8"></el-col>
          <el-col :span="8">
            <el-button type="primary" @click="handleLogin" :loading="loading">
              {{ loading ? 'Loading...' : 'Login' }}
            </el-button>
          </el-col>
          <el-col :span="8"></el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: 400px;
  padding: 20px;
  background-color: rgb(217, 227, 243);
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  color: #303133;
}
</style>
