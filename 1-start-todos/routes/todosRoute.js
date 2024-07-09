import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import todosController from '../controllers/todosController.js';

const todosRouter = express.Router();

todosRouter.use(authMiddleware);  // Tüm rotalar için JWT doğrulama

// Route Handlers
todosRouter.post('/', todosController.createTodo);
todosRouter.put('/:todoId/:boardId', todosController.updateTodo);
todosRouter.delete('/:todoId/:boardId', todosController.deleteTodo);

export default todosRouter;