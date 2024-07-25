<script setup>
import { reactive, ref } from 'vue'

const loginForm = reactive({
  email: '',
  password: '',
})

const loginFormRef = ref(null)

const handleLogin = () => {
  console.log('Login attempt:', loginForm)
}
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">Login</h2>
      <el-form :model="loginForm" ref="loginFormRef">
        <el-form-item label="Email">
          <el-input v-model="loginForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 400px;
  padding: 20px;
  background-color: rgb(180, 202, 235);
}

.login-title {
  text-align: center;
  margin-bottom: 40px;
}
</style>
