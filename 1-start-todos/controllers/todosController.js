import asyncHandler from "../utils/asyncHandler.js";
import * as todosService from "../services/todosService.js";

// Route handle for POST /api/todos
export const createTodo = asyncHandler(async (req, res) => { // asyncHandler ile route handler'lar tarafından atılan hataları otomatik yakalama
    const userId = req.user.id;
    const { title, completed, boardId } = req.body; // Express.js ile req.body üzerinden veriyi alıyoruz
    const newTodo = await todosService.createTodo(title, completed, boardId, userId);
    res.status(201).json(newTodo); // Express.js ile status() ve json() metodları ile response döndürüyoruz
});

// Route handler for DELETE /api/todos/:todoId/:boardId
export const deleteTodo = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { todoId, boardId } = req.params;
    const isDeleted = await todosService.deleteTodo(todoId, boardId, userId); // ID'yi URL parametresinden al (Express.js)
    if (isDeleted) {
        res.status(200).json({ message: 'Todo is deleted' });
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// Route handler for PUT /api/todos/:todoId/:boardId
export const updateTodo = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { todoId, boardId } = req.params;
    const { title, completed } = req.body;
    const updatedTodo = await todosService.updateTodo(todoId, boardId, userId, title, completed);
    if (updatedTodo) {
        res.status(200).json({
            message: `Todo with id ${updatedTodo._id} updated`,
            currentData: updatedTodo
        });
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});