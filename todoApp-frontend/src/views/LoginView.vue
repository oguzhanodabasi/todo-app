<script setup>
import { reactive } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useFormValidation } from '../composables/useFormValidation'

const { login, loading } = useAuth()
const { formRef, validateForm } = useFormValidation()

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
  const isValid = await validateForm()
  if (!isValid) return

  login({
    username: formData.username,
    password: formData.password,
  })
}
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">Login</h2>
      <el-form
        :model="formData"
        :rules="rules"
        ref="formRef"
        @submit.prevent="handleLogin"
      >
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
            <el-button
              type="primary"
              native-type="submit"
              :loading="loading"
              class="login-button"
            >
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

.login-button {
  display: block;
  margin: 20px auto 0;
}
</style>
