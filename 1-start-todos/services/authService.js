import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/usersModel.js';

const generateSalt = () => {
    return crypto.randomBytes(16).toString('hex'); // Salt oluşturma
}

const generateRefreshToken = (user) => {
    return jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' }); // Refresh token oluşturma
};

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role, salt: user.salt }, process.env.JWT_SECRET, { expiresIn: '15m' }); // Access token oluşturma
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

const refreshToken = async (oldRefreshToken) => {
    const decoded = jwt.verify(oldRefreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== oldRefreshToken) {
        throw new Error('Invalid refresh token!');
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    user.refreshToken = newRefreshToken;
    await user.save();

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

const logout = async (userId) => {
    const user = await User.findById(userId);
    if (user) {
        user.refreshToken = '';
        user.salt = '';
        await user.save();
    }
};

export default {
    login,
    refreshToken,
    logout
};
