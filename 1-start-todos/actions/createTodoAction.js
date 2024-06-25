import {todos} from '../models/todosData.js'

// Route handle for POST /api/todos
const createTodoAction = (req, res) => {
    const { title } = req.body; // Express.js ile req.body üzerinden veriyi alıyoruz
    const newTodo = { id: todos.length + 1, title, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo); // Express.js ile status() ve json() metodları ile response döndürüyoruz
};

export { createTodoAction };