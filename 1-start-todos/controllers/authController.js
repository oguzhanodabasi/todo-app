import asyncHandler from '../utils/asyncHandler.js';
import authService from '../services/authService.js';

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const { user, token } = await authService.login(username, password);
    res.status(200).json({ user, token });
});

export default {
    login
};
