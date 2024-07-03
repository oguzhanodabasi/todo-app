import todosRepository from '../repositories/todosRepository.js';

const createTodo = async (title, completed, userId) => {
    return await todosRepository.createTodo(title, completed, userId);
}

const deleteTodo = async (id) => {
    return await todosRepository.deleteTodo(id);
};

const updateTodo = async (id, title, completed) => {
    return await todosRepository.updateTodo(id, title, completed);
};

const getAllTodos = async () => {
    return await todosRepository.getAllTodos();
};

const getTodoById = async (id) => {
    return await todosRepository.getTodoById(id);
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