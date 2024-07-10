import express from 'express';

import roleMiddleware from '../middlewares/roleMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import * as boardsController from '../controllers/boardsController.js';

const boardsRouter = express.Router();

boardsRouter.use(authMiddleware);

router.get('/', boardsController.getAllBoards);
router.put('/:boardId', boardsController.updateBoard);
router.get('/:boardId/todos', boardsController.getBoardById);
router.post('/', boardsController.createBoard);
router.get('/:boardId/todos/:todoId', boardsController.getTodoById);
router.delete('/:boardId', boardsController.deleteBoard);

export default router;
