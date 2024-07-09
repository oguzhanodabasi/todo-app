import boardsRepository from '../repositories/boardsRepository.js';

const createBoard = async (boardName) => {
    return await boardsRepository.createBoard(boardName);
};

const deleteBoard = async (boardId) => {
    return await boardsRepository.deleteBoard(boardId);
};

const updateBoard = async (boardId, name) => {
    return await boardsRepository.updateBoard(boardId, name);
};

const getAllBoards = async (userId) => {
    return await boardsRepository.getAllBoards(userId);
};

const getBoardById = async (userId, boardId) => {
    return await boardsRepository.getBoardById(userId, boardId);
};

const getTodoById = async (userId, boardId, todoId) => {
    return await boardsRepository.getTodoById(userId, boardId, todoId);
};

export default {
    createBoard,
    deleteBoard,
    updateBoard,
    getAllBoards,
    getBoardById,
    getTodoById
};
