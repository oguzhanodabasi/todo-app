import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import authController from '../controllers/authController.js';

const authRouter = express.Router();

// Route Handlers
authRouter.post('/login', authController.login);
authRouter.post('/logout', authMiddleware, authController.logout);
authRouter.post('/refresh-token', authController.refreshToken);


export default authRouter;
