import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/usersModel.js';

const generateSalt = () => {
    return crypto.randomBytes(16).toString('hex'); // Salt oluşturma
}

const generateRefreshToken = () => {
    return crypto.randomBytes(32).toString('hex'); // Refresh token oluşturma
};

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role, salt: user.salt }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
    }
    const salt = generateSalt();
    user.salt = salt;

    const refreshToken = generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();

    const accessToken = generateAccessToken(user);

    return { user, accessToken, refreshToken };
};

const refreshToken = async (refreshToken) => {
    const user = await User.findOne({ refreshToken });
    if (!user || user.refreshToken == '') {
        throw new Error('Invalid refresh token or user not found!');
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save();

    return { newAccessToken, newRefreshToken };
};

const logout = async (userId) => {
    const user = await User.findById(userId);
    if (user) {
        user.refreshToken = '';
        await user.save();
    }
};

export default {
    login,
    refreshToken,
    logout
};
