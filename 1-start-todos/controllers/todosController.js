import asyncHandler from "../utils/asyncHandler.js";
import todosService from "../services/todosService.js";

// Route handle for POST /api/todos
const createTodo = asyncHandler(async (req, res) => { // asyncHandler ile route handler'lar tarafından atılan hataları otomatik yakalama
    const { title, completed } = req.body; // Express.js ile req.body üzerinden veriyi alıyoruz
    const newTodo = await todosService.createTodo(title, completed);
    res.status(201).json(newTodo); // Express.js ile status() ve json() metodları ile response döndürüyoruz
});

// Route handler for DELETE /api/todos/:id
const deleteTodo = asyncHandler(async (req, res) => {
    const isDeleted = await todosService.deleteTodo(parseInt(req.params.id, 10)); // ID'yi URL parametresinden al (Express.js)
    if (isDeleted) {
        res.status(200).json({ message: 'Todo is deleted' });
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// Route handler for PUT /api/todos/:id
const updateTodo = asyncHandler(async (req, res) => {
    const { title, completed } = req.body;
    const updatedTodo = await todosService.updateTodo(parseInt(req.params.id, 10), title, completed);
    if (updatedTodo) {
        res.status(200).json({
            message: `Todo with id ${updatedTodo.id} updated`,
            currentData: updatedTodo
        });
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// Route handler for GET /api/todos
const getAllTodos = asyncHandler(async (req, res) => {
    const todos = await todosService.getAllTodos();
    res.status(200).json(todos);
});

// Route handler for GET /api/todos/:id
const getTodoById = asyncHandler(async (req, res) => {
    const todo = await todosService.getTodoById(parseInt(req.params.id, 10));
    if (todo) {
        res.status(200).json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

export default {
    createTodo,
    deleteTodo,
    updateTodo,
    getAllTodos,
    getTodoById
};