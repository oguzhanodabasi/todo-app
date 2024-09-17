<script setup>
import { reactive, ref } from 'vue'

const loginForm = reactive({
  email: '',
  password: '',
})

const loginFormRef = ref(null)

const rules = {
  email: [{ required: true, message: 'Please input email', trigger: 'blur' }],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
  ],
}

const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      alert('Login successful')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">Login</h2>
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="email">
          <el-input
            v-model="loginForm.email"
            autocomplete="off"
            placeholder="Email"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
            placeholder="Password"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="8"></el-col>
          <el-col :span="8"><el-button type="primary" @click="handleLogin">Login</el-button></el-col>
          <el-col :span="8"></el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-card {
  width: 400px;
  padding: 20px;
  background-color: rgb(217, 227, 243);
}
</style>
