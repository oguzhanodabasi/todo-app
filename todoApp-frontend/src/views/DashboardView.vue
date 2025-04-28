<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { List, Plus, SwitchButton } from '@element-plus/icons-vue'

const router = useRouter()
const dialogVisible = ref(false)
const taskFormRef = ref(null)

// Tüm görevleri tek bir array'de tutuyoruz
const tasks = ref([
  {
    id: 1,
    title: 'Login sayfası tasarımı',
    description: 'Kullanıcı girişi için responsive tasarım',
    status: 'todo',
  },
  {
    id: 2,
    title: 'API entegrasyonu',
    description: 'Backend servisleri ile iletişim',
    status: 'inProgress',
  },
  {
    id: 3,
    title: 'Veritabanı kurulumu',
    description: 'MongoDB bağlantısı ve şema oluşturma',
    status: 'completed',
  },
])

// Görevleri durumlarına göre filtreleme
const todoTasks = computed(() =>
  tasks.value.filter((task) => task.status === 'todo')
)
const inProgressTasks = computed(() =>
  tasks.value.filter((task) => task.status === 'inProgress')
)
const completedTasks = computed(() =>
  tasks.value.filter((task) => task.status === 'completed')
)

// Sürükleme işlemi
const handleDrop = (event, status) => {
  const taskId = event.dataTransfer.getData('taskId')
  const taskIndex = tasks.value.findIndex((t) => t.id === parseInt(taskId))

  if (taskIndex !== -1) {
    // Görevi mevcut konumundan kaldır
    const task = tasks.value.splice(taskIndex, 1)[0]

    // Görevi yeni durumla güncelle
    task.status = status

    // Görevi hedef kolonun sonuna ekle
    tasks.value.push(task)
  }
}

const handleDragStart = (event, taskId) => {
  event.dataTransfer.setData('taskId', taskId)
}

// Yeni görev formu
const newTask = reactive({
  title: '',
  description: '',
})

const rules = {
  title: [{ required: true, message: 'Başlık gerekli', trigger: 'blur' }],
}

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

const openNewTaskDialog = () => {
  dialogVisible.value = true
}

const createTask = async () => {
  if (!taskFormRef.value) return

  try {
    await taskFormRef.value.validate()
    // API çağrısı yapılacak
    tasks.value.push({
      id: Date.now(),
      ...newTask,
      status: 'todo',
    })
    dialogVisible.value = false
  } catch (error) {
    console.error('Form validation failed')
  }
}
</script>

<template>
  <div class="dashboard">
    <!-- Üst Menü -->
    <div class="top-menu">
      <div class="left-section">
        <el-icon class="logo"><List /></el-icon>
        <span class="title">Görev Paneli</span>
      </div>
      <div class="right-section">
        <el-button type="primary" size="small" @click="openNewTaskDialog">
          <el-icon><Plus /></el-icon>
          Yeni Görev
        </el-button>
        <el-button type="danger" size="small" @click="handleLogout">
          <el-icon><SwitchButton /></el-icon>
          Çıkış
        </el-button>
      </div>
    </div>

    <!-- Ana İçerik -->
    <div class="main-content">
      <!-- Görev Sütunları -->
      <div class="task-columns">
        <!-- Yapılacaklar -->
        <div
          class="column"
          @drop="handleDrop($event, 'todo')"
          @dragover.prevent
        >
          <div class="column-header">
            <span class="column-title">Yapılacaklar</span>
            <el-tag>{{ todoTasks.length }}</el-tag>
          </div>
          <div class="task-list">
            <el-card
              v-for="task in todoTasks"
              :key="task.id"
              class="task-card"
              draggable="true"
              @dragstart="handleDragStart($event, task.id)"
              shadow="hover"
            >
              <div class="task-content">
                <h4>{{ task.title }}</h4>
                <p>{{ task.description }}</p>
                <div class="task-footer">
                  <el-tag size="small" type="warning">Öncelikli</el-tag>
                </div>
              </div>
            </el-card>
          </div>
        </div>

        <!-- Devam Eden -->
        <div
          class="column"
          @drop="handleDrop($event, 'inProgress')"
          @dragover.prevent
        >
          <div class="column-header">
            <span class="column-title">Devam Eden</span>
            <span class="task-count">2</span>
          </div>
          <div class="task-list">
            <el-card
              v-for="task in inProgressTasks"
              :key="task.id"
              class="task-card"
              draggable="true"
              @dragstart="handleDragStart($event, task.id)"
              shadow="hover"
            >
              <div class="task-content">
                <h4>{{ task.title }}</h4>
                <p>{{ task.description }}</p>
                <div class="task-footer">
                  <el-tag size="small" type="info">Orta</el-tag>
                </div>
              </div>
            </el-card>
          </div>
        </div>

        <!-- Tamamlanan -->
        <div
          class="column"
          @drop="handleDrop($event, 'completed')"
          @dragover.prevent
        >
          <div class="column-header">
            <span class="column-title">Tamamlanan</span>
            <span class="task-count">1</span>
          </div>
          <div class="task-list">
            <el-card
              v-for="task in completedTasks"
              :key="task.id"
              class="task-card"
              draggable="true"
              @dragstart="handleDragStart($event, task.id)"
              shadow="hover"
            >
              <div class="task-content">
                <h4>{{ task.title }}</h4>
                <p>{{ task.description }}</p>
                <div class="task-footer">
                  <el-tag size="small" type="success">Tamamlandı</el-tag>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>

    <!-- Yeni Görev Dialog -->
    <el-dialog v-model="dialogVisible" title="Yeni Görev">
      <el-form :model="newTask" :rules="rules" ref="taskFormRef">
        <el-form-item label="Başlık" prop="title">
          <el-input v-model="newTask.title" />
        </el-form-item>
        <el-form-item label="Açıklama" prop="description">
          <el-input type="textarea" v-model="newTask.description" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">İptal</el-button>
        <el-button type="primary" @click="createTask">Kaydet</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.dashboard {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
}

.top-menu {
  padding: 10px 20px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.left-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo,
.title,
.column-title,
.task-content h4 {
  color: #409eff;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-x: auto;
}

.task-columns {
  display: flex;
  gap: 20px;
  height: 100%;
}

.column {
  min-width: 300px;
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.task-count {
  background-color: #e1e4e8;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: calc(100vh - 200px);
  overflow-y: auto;
}

.task-card {
  cursor: move;
}

.task-content {
  padding: 10px;
}

.task-content p {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 14px;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
