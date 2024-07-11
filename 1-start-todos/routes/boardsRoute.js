import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import * as todosController from '../controllers/todosController.js';
import * as boardsController from '../controllers/boardsController.js';
import * as userBoardsController from '../controllers/userBoardsController.js';

const boardsRouter = express.Router();

boardsRouter.use(authMiddleware);

// Route Handlers
boardsRouter.post('/', boardsController.createBoard);
boardsRouter.get('/', boardsController.getAllBoards);
boardsRouter.put('/:boardId', boardsController.updateBoard);
boardsRouter.delete('/:boardId', boardsController.deleteBoard);

boardsRouter.get('/todos/:boardId/', boardsController.getBoardById);
boardsRouter.get('/todos/:boardId/:todoId', boardsController.getTodoById);
boardsRouter.post('/todos', todosController.createTodo);
boardsRouter.put('/:todoId/:boardId', todosController.updateTodo);
boardsRouter.delete('/:todoId/:boardId', todosController.deleteTodo);

boardsRouter.post('/userboards/:boardId/assignuser', userBoardsController.addUserToBoardByEmail);
boardsRouter.delete('/userboards/:boardId/removeuser', userBoardsController.removeUserFromBoardByEmail);

export default boardsRouter;
