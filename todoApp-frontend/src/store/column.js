import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useColumnStore = defineStore('column', () => {
    const columns = ref([])

    // Kolon işlemleri
    const getColumns = (boardId) => {
        return columns.value.filter(column => column.boardId === boardId)
    }

    const addColumn = (boardId, columnTitle) => {
        columns.value.push({
            id: Date.now(),
            boardId,
            title: columnTitle,
            tasks: []
        })
    }

    const deleteColumn = (columnId) => {
        const index = columns.value.findIndex(c => c.id === columnId)
        if (index !== -1) {
            columns.value.splice(index, 1)
        }
    }

    const updateColumn = (columnId, updates) => {
        const column = columns.value.find(c => c.id === columnId)
        if (column) {
            Object.assign(column, updates)
        }
    }

    return {
        columns,
        getColumns,
        addColumn,
        deleteColumn,
        updateColumn
    }
}) 