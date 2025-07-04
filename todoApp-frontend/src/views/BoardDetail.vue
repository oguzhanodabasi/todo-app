<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBoardStore } from '../store/board'
import { useColumnStore } from '../store/column'
import { useTaskStore } from '../store/task'
import {
  Menu,
  Plus,
  ArrowLeft,
  Delete,
  Document,
  Collection,
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const boardStore = useBoardStore()
const columnStore = useColumnStore()
const taskStore = useTaskStore()

const board = ref(null)
const columns = ref([])
const dialogVisible = ref(false)
const dialogType = ref(null) // 'column' veya 'task'
const selectedColumnId = ref(null)

// Form models
const newColumnTitle = ref('')
const newTask = ref({
  title: '',
  description: '',
})

onMounted(() => {
  board.value = boardStore.getBoard(route.params.id)
  if (!board.value) {
    router.push('/dashboard')
    return
  }
  columns.value = columnStore.getColumns(board.value.id)
})

const handleDrop = (event, targetColumnId) => {
  const taskId = parseInt(event.dataTransfer.getData('taskId'))
  taskStore.moveTask(taskId, targetColumnId)
}

const handleDragStart = (event, taskId) => {
  event.dataTransfer.setData('taskId', taskId)
}

const openDialog = (type, columnId = null) => {
  if (type !== 'column' && type !== 'task') return
  dialogType.value = type
  selectedColumnId.value = columnId
  dialogVisible.value = true
}

const closeDialog = () => {
  dialogVisible.value = false
  dialogType.value = null
  selectedColumnId.value = null
  newColumnTitle.value = ''
  newTask.value = { title: '', description: '' }
}

const addColumn = () => {
  if (newColumnTitle.value.trim()) {
    columnStore.addColumn(board.value.id, newColumnTitle.value)
    columns.value = columnStore.getColumns(board.value.id)
    closeDialog()
  }
}

const addTask = (columnId, taskData) => {
  if (taskData.title.trim()) {
    taskStore.addTask(columnId, taskData)
    closeDialog()
  }
}

const deleteColumn = (columnId) => {
  columnStore.deleteColumn(columnId)
  columns.value = columnStore.getColumns(board.value.id)
}

const deleteTask = (taskId) => {
  taskStore.deleteTask(taskId)
}
</script>

<template>
  <div class="board-detail">
    <!-- Üst Menü -->
    <div class="top-menu">
      <div class="left-section">
        <el-button @click="router.push('/dashboard')" class="back-button">
          <el-icon><ArrowLeft /></el-icon>
          Geri
        </el-button>
        <h2 class="board-title">
          <el-icon><Document /></el-icon>
          {{ board?.title }}
        </h2>
      </div>
      <div class="right-section">
        <el-button
          type="primary"
          @click="openDialog('column')"
          class="add-column-button"
        >
          <el-icon><Collection /></el-icon>
          Yeni Kolon
        </el-button>
      </div>
    </div>

    <!-- Kolonlar -->
    <div class="columns-container">
      <div
        v-for="column in columns"
        :key="column.id"
        class="column"
        @dragover.prevent
        @drop="handleDrop($event, column.id)"
      >
        <div class="column-header">
          <h3 class="column-title">{{ column.title }}</h3>
          <div class="column-actions">
            <el-button
              type="primary"
              size="small"
              circle
              @click="openDialog('task', column.id)"
            >
              <el-icon><Plus /></el-icon>
            </el-button>
            <el-button
              type="danger"
              size="small"
              circle
              @click="deleteColumn(column.id)"
            >
              <el-icon><Delete /></el-icon>
            </el-button>
          </div>
        </div>

        <!-- Tasklar -->
        <div class="tasks-container">
          <div
            v-for="task in taskStore.getTasks(column.id)"
            :key="task.id"
            class="task-card"
            draggable="true"
            @dragstart="handleDragStart($event, task.id)"
          >
            <div class="task-content">
              <h4 class="task-title">{{ task.title }}</h4>
              <p class="task-description">{{ task.description }}</p>
            </div>
            <div class="task-actions">
              <el-button
                type="danger"
                size="small"
                circle
                @click="deleteTask(task.id)"
              >
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'column' ? 'Yeni Kolon' : 'Yeni Task'"
      width="30%"
      @close="closeDialog"
    >
      <!-- Kolon Formu -->
      <el-form v-if="dialogType === 'column'">
        <el-form-item label="Kolon Adı" required>
          <el-input v-model="newColumnTitle" placeholder="Kolon adını girin" />
        </el-form-item>
      </el-form>

      <!-- Task Formu -->
      <el-form v-else-if="dialogType === 'task'" :model="newTask">
        <el-form-item label="Task Başlığı" required>
          <el-input
            v-model="newTask.title"
            placeholder="Task başlığını girin"
          />
        </el-form-item>
        <el-form-item label="Açıklama">
          <el-input
            type="textarea"
            v-model="newTask.description"
            placeholder="Task açıklaması girin"
            :rows="3"
          />
        </el-form-item>
      </el-form>

      <!-- Footer -->
      <template #footer>
        <el-button @click="closeDialog">İptal</el-button>
        <el-button
          type="primary"
          @click="
            dialogType === 'column'
              ? addColumn()
              : addTask(selectedColumnId, newTask)
          "
        >
          Ekle
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.board-detail {
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

.back-button {
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

.back-button:hover {
  background-color: #f4f9fd;
  box-shadow: 0 2px 8px rgba(2, 106, 167, 0.15);
}

.board-title {
  font-size: 1.5em;
  font-weight: 600;
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.board-title .el-icon {
  font-size: 24px;
}

.add-column-button {
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

.add-column-button .el-icon {
  color: #026aa7;
  margin-right: 8px;
}

.add-column-button:hover {
  background-color: #e6f0fa;
  color: #0747a6;
}

.columns-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  overflow-x: auto;
  height: calc(100vh - 70px);
}

.column {
  min-width: 300px;
  background-color: #ebecf0;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 2px solid #dfe1e6;
}

.column-title {
  font-size: 1.1em;
  font-weight: 600;
  color: #172b4d;
  margin: 0;
}

.column-actions {
  display: flex;
  gap: 16px;
}

.column-actions .el-button {
  padding: 8px 16px;
  transition: all 0.3s ease;
  background-color: #026aa7;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
}

.column-actions .el-button span {
  margin-left: 4px;
}

.column-actions .el-button--circle {
  padding: 8px;
}

.column-actions .el-button--circle .el-icon {
  margin: 0;
}

.column-actions .el-button:hover {
  transform: translateY(-2px);
  background-color: #0747a6;
}

.column-actions .el-button--danger {
  background-color: #dc3545;
  border: none;
  color: white;
}

.column-actions .el-button--danger:hover {
  background-color: #c82333;
}

.column-actions .el-icon {
  font-size: 20px;
  transition: transform 0.3s ease;
  color: white;
}

.column-actions .el-button:hover .el-icon {
  transform: scale(1.1);
}

.column-actions .el-button .el-icon {
  margin-right: 8px;
}

.tasks-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 50px;
}

.task-card {
  background-color: white;
  border-radius: 6px;
  padding: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  cursor: move;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  transition: all 0.2s ease;
}

.task-card:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.task-content {
  flex: 1;
}

.task-title {
  font-size: 1em;
  font-weight: 600;
  color: #172b4d;
  margin: 0 0 5px 0;
}

.task-description {
  font-size: 0.9em;
  color: #6b778c;
  margin: 0;
  line-height: 1.4;
}

.task-actions {
  opacity: 0;
  transition: all 0.3s ease;
}

.task-card:hover .task-actions {
  opacity: 1;
}

.task-actions .el-button {
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  transition: all 0.3s ease;
}

.task-actions .el-button:hover {
  transform: translateY(-2px);
  background-color: rgba(255, 255, 255, 0.3);
}

.task-actions .el-button--danger {
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
}

.task-actions .el-button--danger:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.task-actions .el-icon {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.task-actions .el-button:hover .el-icon {
  transform: scale(1.1);
}

/* Scrollbar Stilleri */
.columns-container::-webkit-scrollbar {
  height: 8px;
}

.columns-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.columns-container::-webkit-scrollbar-thumb {
  background: #c0c4cc;
  border-radius: 4px;
}

.columns-container::-webkit-scrollbar-thumb:hover {
  background: #909399;
}

</style>
