import todosRepository from '../repositories/todosRepository.js';

const createTodo = async (title, completed, userId) => {
    return await todosRepository.createTodo(title, completed, userId);
}

const deleteTodo = async (id, userId) => {
    return await todosRepository.deleteTodo(id, userId);
};

const updateTodo = async (id, title, completed, userId) => {
    return await todosRepository.updateTodo(id, title, completed, userId);
};

const getAllTodos = async (userId) => {
    return await todosRepository.getAllTodos(userId);
};

const getTodoById = async (id, userId) => {
    return await todosRepository.getTodoById(id, userId);
};

const getTodosByUserId = async (userId) => {
    return await todosRepository.getTodosByUserId(userId);
};

export default {
    createTodo,
    deleteTodo,
    updateTodo,
    getAllTodos,
    getTodoById,
    getTodosByUserId
};