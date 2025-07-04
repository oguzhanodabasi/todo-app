import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('task', () => {
    const tasks = ref([])

    // Task işlemleri
    const getTasks = (columnId) => {
        return tasks.value.filter(task => task.columnId === columnId)
    }

    const addTask = (columnId, taskData) => {
        tasks.value.push({
            id: Date.now(),
            columnId,
            ...taskData
        })
    }

    const deleteTask = (taskId) => {
        const index = tasks.value.findIndex(t => t.id === taskId)
        if (index !== -1) {
            tasks.value.splice(index, 1)
        }
    }

    const updateTask = (taskId, updates) => {
        const task = tasks.value.find(t => t.id === taskId)
        if (task) {
            Object.assign(task, updates)
        }
    }

    const moveTask = (taskId, newColumnId) => {
        const task = tasks.value.find(t => t.id === taskId)
        if (task) {
            task.columnId = newColumnId
        }
    }

    return {
        tasks,
        getTasks,
        addTask,
        deleteTask,
        updateTask,
        moveTask
    }
}) 