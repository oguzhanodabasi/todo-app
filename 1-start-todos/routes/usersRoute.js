import express from 'express';

import roleMiddleware from '../middlewares/roleMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import usersController from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.use(authMiddleware); // Tüm rotalar için JWT doğrulama
usersRouter.use(roleMiddleware); // Sadece 'admin' rolüne sahip kullanıcılar erişebilir

// Route Handlers
usersRouter.get('/', usersController.getAllUsers);
usersRouter.post('/', usersController.createUser);
usersRouter.put('/:userId', usersController.updateUser);
usersRouter.get('/:userId', usersController.getUserById);
usersRouter.delete('/:userId', usersController.deleteUser);

export default usersRouter;