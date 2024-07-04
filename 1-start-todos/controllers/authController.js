import asyncHandler from '../utils/asyncHandler.js';
import authService from '../services/authService.js';

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.login(username, password);
    res.status(200).json({ user, accessToken, refreshToken });
});

const refreshToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    const { newAccessToken, newRefreshToken } = await authService.refreshToken(refreshToken);
    res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
});

const logout = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    await authService.logout(userId);
    res.status(200).json({ message: 'Logged out successfully' });
});

export default {
    login,
    refreshToken,
    logout
};
