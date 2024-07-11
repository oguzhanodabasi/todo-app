import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/usersModel.js';

const _generateSalt = () => {
    return crypto.randomBytes(16).toString('hex'); // Salt oluşturma
}

const _generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); // Refresh token oluşturma
};

const _generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role, salt: user.salt }, process.env.JWT_SECRET, { expiresIn: '15m' }); // Access token oluşturma
};

export const login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
    }

    const salt = _generateSalt();
    user.salt = salt;

    const refreshToken = _generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    const accessToken = _generateAccessToken(user);

    return { user, accessToken, refreshToken };
};

export const refreshToken = async (oldRefreshToken) => {
    const decoded = jwt.verify(oldRefreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== oldRefreshToken) {
        throw new Error('Invalid refresh token!');
    }

    const newAccessToken = _generateAccessToken(user);
    const newRefreshToken = _generateRefreshToken(user);

    user.refreshToken = newRefreshToken;
    await user.save();

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export const logout = async (userId) => {
    const user = await User.findById(userId);
    if (user) {
        user.refreshToken = '';
        user.salt = '';
        await user.save();
    }
};