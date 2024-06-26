import todoRepository from '../repositories/todosRepository.js';

const createTodo = (title) => {
    return todoRepository.createTodo(title);
}

const deleteTodo = (id) => {
    return todoRepository.deleteTodo(id);
};

const updateTodo = (id, title, completed) => {
    return todoRepository.updateTodo(id, title, completed);
};

const getAllTodos = () => {
    return todoRepository.getAllTodos();
};

const getTodoById = (id) => {
    return todoRepository.getTodoById(id);
};

export default {
    createTodo,
    deleteTodo,
    updateTodo,
    getAllTodos,
    getTodoById
};