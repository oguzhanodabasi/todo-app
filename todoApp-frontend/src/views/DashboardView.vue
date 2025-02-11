<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <el-button type="danger" @click="handleLogout">Logout</el-button>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 20px;
}
</style>
