import express from 'express';

import usersController from '../controllers/usersController.js';

const usersRouter = express.Router();

// Route Handlers
usersRouter.get('/', usersController.getAllUsers);
usersRouter.post('/', usersController.createUser);
usersRouter.put('/:id', usersController.updateUser);
usersRouter.get('/:id', usersController.getUserById);
usersRouter.delete('/:id', usersController.deleteUser);

export default usersRouter;