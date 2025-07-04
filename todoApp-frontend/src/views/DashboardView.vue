<script setup>
import { ref } from 'vue'
import { List, Collection, SwitchButton, Delete } from '@element-plus/icons-vue'
import { useAuthStore } from '../store/auth'
import { useBoardStore } from '../store/board'

const auth = useAuthStore()
const boardStore = useBoardStore()
const dialogVisible = ref(false)

const newBoard = ref({
  title: '',
  description: '',
})

const createBoard = () => {
  boardStore.addBoard(newBoard.value)
  dialogVisible.value = false
  newBoard.value = { title: '', description: '' }
}
</script>

<template>
  <div class="dashboard">
    <!-- Üst Menü -->
    <div class="top-menu">
      <div class="left-section">
        <el-icon class="logo"><List /></el-icon>
        <span class="title">Çalışma Alanları</span>
      </div>
      <div class="right-section">
        <el-button
          type="primary"
          @click="dialogVisible = true"
          class="new-board-button"
        >
          <el-icon><Collection /></el-icon>
          Yeni Board
        </el-button>
        <el-button type="danger" @click="auth.logout" class="logout-button">
          <el-icon><SwitchButton /></el-icon>
          Çıkış
        </el-button>
      </div>
    </div>

    <!-- Ana İçerik -->
    <div class="main-content">
      <h2 class="section-title">Tüm Boardlar</h2>
      <div class="boards-grid">
        <router-link
          v-for="board in boardStore.boards"
          :key="board.id"
          :to="`/board/${board.id}`"
          class="board-card"
        >
          <el-card :body-style="{ padding: '0px' }">
            <div class="board-header">
              <h3>{{ board.title }}</h3>
              <el-button
                type="danger"
                size="small"
                circle
                @click.prevent="boardStore.deleteBoard(board.id)"
              >
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
            <div class="board-content">
              <p>{{ board.description }}</p>
            </div>
          </el-card>
        </router-link>

        <!-- Yeni Board Ekle Kartı -->
        <div class="board-card add-board" @click="dialogVisible = true">
          <el-card>
            <div class="add-board-content">
              <el-icon><Collection /></el-icon>
              <span>Yeni Board Oluştur</span>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <!-- Yeni Board Dialog -->
    <el-dialog v-model="dialogVisible" title="Yeni Board">
      <el-form :model="newBoard">
        <el-form-item label="Board Adı" required>
          <el-input v-model="newBoard.title" placeholder="Board adını girin" />
        </el-form-item>
        <el-form-item label="Açıklama">
          <el-input
            type="textarea"
            v-model="newBoard.description"
            placeholder="Board açıklaması girin"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">İptal</el-button>
        <el-button type="primary" @click="createBoard">Oluştur</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.top-menu {
  padding: 15px 20px;
  background-color: #026aa7;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo {
  font-size: 24px;
  color: white;
}

.title {
  font-size: 1.5em;
  font-weight: 600;
  color: white;
}

.right-section {
  display: flex;
  gap: 10px;
}

.right-section .el-button {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #fff;
  border: none;
  color: #026aa7;
  padding: 8px 20px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 1px 4px rgba(2, 106, 167, 0.08);
}

.right-section .el-button .el-icon {
  color: #026aa7;
  margin-right: 8px;
}

.right-section .el-button:hover {
  background-color: #e6f0fa;
  color: #0747a6;
}

.right-section .el-button--danger {
  background-color: #fff;
  color: #dc3545;
  box-shadow: 0 1px 4px rgba(220, 53, 69, 0.08);
}

.right-section .el-button--danger .el-icon {
  color: #dc3545;
}

.right-section .el-button--danger:hover {
  background-color: #fbeaec;
  color: #b52a37;
  border: none;
}

.right-section .el-button:hover .el-icon {
  transform: scale(1.1);
}

.section-title {
  margin: 20px;
  color: #172b4d;
  font-size: 1.3em;
  font-weight: 600;
}

.boards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
}

.board-card {
  text-decoration: none;
  color: inherit;
}

.board-header {
  padding: 15px;
  background-color: #026aa7;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.board-header h3 {
  margin: 0;
  font-size: 1.1em;
  font-weight: 600;
}

.board-header .el-button {
  padding: 6px;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
}

.board-header .el-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.board-header .el-icon {
  font-size: 18px;
}

.board-content {
  padding: 15px;
  background-color: white;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.board-content p {
  margin: 0;
  color: #6b778c;
  font-size: 0.9em;
  line-height: 1.4;
}

.add-board {
  cursor: pointer;
}

.add-board .el-card {
  height: 100%;
  border: 2px dashed #dfe1e6;
  background-color: #ebecf0;
  transition: all 0.2s ease;
}

.add-board .el-card:hover {
  border-color: #026aa7;
  background-color: #f4f5f7;
}

.add-board-content {
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #6b778c;
}

.add-board-content:hover {
  color: #026aa7;
}

.add-board-content .el-icon {
  font-size: 24px;
}
</style>
