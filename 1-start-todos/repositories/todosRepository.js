import Todo from '../models/todosModel.js';

const createTodo = (title) => {
    const newTodo = new Todo({ title });
    newTodo.save();
    return newTodo;
}

const deleteTodo = (id) => {
    return Todo.findByIdAndDelete(id);
};

const updateTodo = (id, title, completed) => {
    return Todo.findByIdAndUpdate(id, { title, completed }, { new: true });
};

const getAllTodos = () => {
    const todos = Todo.find({}).exec();
    return todos;
};

const getTodoById = (id) => {
    return Todo.findById(id);
};

export default {
    createTodo,
    deleteTodo,
    updateTodo,
    getAllTodos,
    getTodoById
};