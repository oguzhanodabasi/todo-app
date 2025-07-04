import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBoardStore = defineStore('board', () => {
    const boards = ref([
        {
            id: 1,
            title: 'Yazılım Projesi',
            description: 'Frontend geliştirme projesi'
        }
    ])

    // Board işlemleri
    const getBoard = (boardId) => {
        return boards.value.find(board => board.id === parseInt(boardId))
    }

    const addBoard = (board) => {
        boards.value.push({
            id: Date.now(),
            ...board
        })
    }

    const deleteBoard = (boardId) => {
        const index = boards.value.findIndex(b => b.id === boardId)
        if (index !== -1) {
            boards.value.splice(index, 1)
        }
    }

    return {
        boards,
        getBoard,
        addBoard,
        deleteBoard
    }
})