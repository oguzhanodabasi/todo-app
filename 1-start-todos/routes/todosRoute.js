import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import todosController from '../controllers/todosController.js';

const todosRouter = express.Router();

todosRouter.use(authMiddleware);  // Tüm rotalar için JWT doğrulama
// Route Handlers
todosRouter.get('/', todosController.getAllTodos);
todosRouter.post('/', todosController.createTodo);
todosRouter.put('/:id', todosController.updateTodo);
todosRouter.get('/users', todosController.getTodosByUserId);
todosRouter.get('/:id', todosController.getTodoById);
todosRouter.delete('/:id', todosController.deleteTodo);

export default todosRouter;