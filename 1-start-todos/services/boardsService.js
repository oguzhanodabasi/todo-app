import * as boardsRepository from '../repositories/boardsRepository.js';

export const createBoard = async (userId, name) => {
    return await boardsRepository.createBoard(userId, name);
};

export const deleteBoard = async (userId, boardId) => {
    return await boardsRepository.deleteBoard(userId, boardId);
};

export const updateBoard = async (userId, boardId, name) => {
    return await boardsRepository.updateBoard(userId, boardId, name);
};

export const getAllBoards = async (userId) => {
    return await boardsRepository.getAllBoards(userId);
};

export const getBoardById = async (userId, boardId) => {
    return await boardsRepository.getBoardById(userId, boardId);
};

export const getTodoById = async (userId, boardId, todoId) => {
    return await boardsRepository.getTodoById(userId, boardId, todoId);
};