<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '../store/auth'
import { useFormValidation } from '../composables/useFormValidation'

const auth = useAuthStore()
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

  auth.login({
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
              :loading="auth.loading"
              class="login-button"
            >
              {{ auth.loading ? 'Loading...' : 'Login' }}
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
  background-color: #f5f7fa;
  background-image: linear-gradient(to bottom right, #026aa7, #0747a6);
}

.login-card {
  width: 400px;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: #172b4d;
  font-size: 1.8em;
  font-weight: 600;
}

.el-form-item {
  margin-bottom: 25px;
}

.el-input__inner {
  height: 40px;
  border-radius: 4px;
  border-color: #dfe1e6;
}

.el-input__inner:focus {
  border-color: #026aa7;
}

.el-input__inner:hover {
  border-color: #026aa7;
}

.login-button {
  display: block;
  width: 100%;
  height: 40px;
  margin: 30px auto 0;
  background-color: #026aa7;
  border: none;
  font-size: 1em;
  font-weight: 500;
  transition: all 0.2s ease;
}

.login-button:hover {
  background-color: #0747a6;
}

.login-button:active {
  transform: translateY(1px);
}

/* Form Stilleri */
.el-form-item__label {
  font-weight: 500;
  color: #172b4d;
  font-size: 0.95em;
}

.el-input__wrapper {
  box-shadow: none !important;
  border: 1px solid #dfe1e6;
}

.el-input__wrapper:hover {
  border-color: #026aa7;
}

.el-input__wrapper.is-focus {
  border-color: #026aa7;
  box-shadow: 0 0 0 1px #026aa7 !important;
}

/* Hata Mesajları */
.el-form-item__error {
  color: #ff4d4f;
  font-size: 0.85em;
  margin-top: 4px;
}
</style>
