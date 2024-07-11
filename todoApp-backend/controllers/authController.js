import asyncHandler from '../utils/asyncHandler.js';
import * as authService from '../services/authService.js';

export const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.login(username, password);
    res.status(200).json({ user, accessToken, refreshToken });
});

export const refreshToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshToken(refreshToken);
    res.status(200).json(tokens);
});

export const logout = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    await authService.logout(userId);
    res.status(200).json({ message: 'Logged out successfully' });
});