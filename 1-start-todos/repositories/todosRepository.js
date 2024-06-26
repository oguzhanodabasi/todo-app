import { todos } from '../models/todosDataModel.js'

const getNextTodoId = () => {
    const lastTodo = todos[todos.length - 1];
    const nextId = lastTodo ? lastTodo.id + 1 : 1; // ilk todo ise id 1'den başlar

    return nextId;
};

const createTodo = (title) => {
    const newTodo = { id: getNextTodoId(), title, completed: false };
    todos.push(newTodo);
    return newTodo;
}

const deleteTodo = (id) => {
    id = parseInt(id, 10);
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        const [deletedTodo] = todos.splice(todoIndex, 1); // destructure 
        return deletedTodo;
    }
    return null;
};

const updateTodo = (id, title, completed) => {
    id = parseInt(id, 10);
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        const oldTodo = { ...todos[todoIndex] }; // spread syntax
        todos[todoIndex] = { ...todos[todoIndex], title, completed };
        return { oldTodo, newTodo: todos[todoIndex] };
    }
    return null;
};

const getAllTodos = () => {
    return todos;
};

const getTodoById = (id) => {
    id = parseInt(id, 10);
    return todos.find(todo => todo.id === id);
};

export default {
    createTodo,
    deleteTodo,
    updateTodo,
    getAllTodos,
    getTodoById
};