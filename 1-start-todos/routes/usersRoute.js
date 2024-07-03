import express from 'express';

import usersController from '../controllers/usersController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const usersRouter = express.Router();

usersRouter.use(authMiddleware);  // Tüm rotalar için JWT doğrulama
// Route Handlers
usersRouter.get('/', usersController.getAllUsers);
usersRouter.post('/', usersController.createUser);
usersRouter.put('/:id', usersController.updateUser);
usersRouter.get('/:id', usersController.getUserById);
usersRouter.delete('/:id', usersController.deleteUser);

export default usersRouter;