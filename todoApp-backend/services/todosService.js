import * as todosRepository from '../repositories/todosRepository.js';

export const createTodo = async (title, completed, boardId, userId) => {
    return await todosRepository.createTodo(title, completed, boardId, userId);
}

export const deleteTodo = async (todoId, boardId, userId) => {
    return await todosRepository.deleteTodo(todoId, boardId, userId);
};

export const updateTodo = async (todoId, boardId, userId, title, completed) => {
    return await todosRepository.updateTodo(todoId, boardId, userId, title, completed);
};