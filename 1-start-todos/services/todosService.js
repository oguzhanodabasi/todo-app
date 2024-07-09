import todosRepository from '../repositories/todosRepository.js';

const createTodo = async (title, completed, boardId, userId) => {
    return await todosRepository.createTodo(title, completed, boardId, userId);
}

const deleteTodo = async (todoId, boardId, userId) => {
    return await todosRepository.deleteTodo(todoId, boardId, userId);
};

const updateTodo = async (todoId, boardId, userId, title, completed) => {
    return await todosRepository.updateTodo(todoId, boardId, userId, title, completed);
};

export default {
    createTodo,
    deleteTodo,
    updateTodo
};