import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import * as userBoardsController from '../controllers/userBoardsController.js';

const userBoardsRouter = express.Router();

userBoardsRouter.use(authMiddleware);

// Route Handlers
userBoardsRouter.post('/:boardId', userBoardsController.addUserToBoardByEmail);
userBoardsRouter.delete('/:boardId', userBoardsController.removeUserFromBoardByEmail);

export default userBoardsRouter;