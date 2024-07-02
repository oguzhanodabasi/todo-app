import Todo from '../models/todosModel.js';

const getNextTodoId = async () => {
    const lastTodo = await Todo.findOne().sort({ id: -1 });
    return lastTodo ? lastTodo.id + 1 : 1;
};

const createTodo = async (title, completed) => {
    const nextId = await getNextTodoId();
    const newTodo = new Todo();
    newTodo.id = nextId;
    newTodo.title = title;
    newTodo.completed = completed;
    await newTodo.save();
    return newTodo;
}

const deleteTodo = async (id) => {
    const deletedTodo = await Todo.findOneAndDelete({ id });
    return deletedTodo;
};

const updateTodo = async (id, title, completed) => {
    const updatedTodo = await Todo.findOneAndUpdate({ id }, { title, completed }, { new: true });
    return updatedTodo;
};

const getAllTodos = async () => {
    const todos = await Todo.find({});
    return todos;
};

const getTodoById = async (id) => {
    const todo = await Todo.findOne({ id });
    return todo;
};

export default {
    createTodo,
    deleteTodo,
    updateTodo,
    getAllTodos,
    getTodoById
};