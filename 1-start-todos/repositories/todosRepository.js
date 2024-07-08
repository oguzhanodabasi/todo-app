import Todo from '../models/todosModel.js';

const _getNextTodoId = async (userId) => {
    const lastTodo = await Todo.findOne({ userId: userId }).sort({ id: -1 });
    return lastTodo ? lastTodo.id + 1 : 1;
};

const createTodo = async (title, completed, userId) => {
    const nextId = await _getNextTodoId(userId);
    const newTodo = new Todo();
    newTodo.id = nextId;
    newTodo.title = title;
    newTodo.completed = completed;
    newTodo.userId = userId;
    await newTodo.save();
    return newTodo;
}

const deleteTodo = async (id, userId) => {
    const deletedTodo = await Todo.findOneAndDelete({ id: id, userId: userId });
    return deletedTodo;
};

const updateTodo = async (id, title, completed, userId) => {
    const updatedTodo = await Todo.findOneAndUpdate({ id: id, userId: userId }, { title, completed }, { new: true });
    return updatedTodo;
};

const getAllTodos = async (userId) => {
    const todos = await Todo.find({ userId: userId });
    return todos;
};

const getTodoById = async (id, userId) => {
    const todo = await Todo.findOne({ id: id, userId: userId });
    return todo;
};

const getTodosByUserId = async (userId) => {
    const todos = await Todo.find({ userId: userId }).populate('userId', 'email username');
    return todos;
};

export default {
    createTodo,
    deleteTodo,
    updateTodo,
    getAllTodos,
    getTodoById,
    getTodosByUserId
};