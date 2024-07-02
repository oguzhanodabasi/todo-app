import todoRepository from '../repositories/todosRepository.js';

const createTodo = async (title, completed) => {
    return await todoRepository.createTodo(title,completed);
}

const deleteTodo = async (id) => {
    return await todoRepository.deleteTodo(id);
};

const updateTodo = async (id, title, completed) => {
    return await todoRepository.updateTodo(id, title, completed);
};

const getAllTodos = async () => {
    return await todoRepository.getAllTodos();
};

const getTodoById = async (id) => {
    return await todoRepository.getTodoById(id);
};

export default {
    createTodo,
    deleteTodo,
    updateTodo,
    getAllTodos,
    getTodoById
};