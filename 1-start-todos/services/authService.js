import jwt from 'jsonwebtoken';

import User from '../models/usersModel.js';

const login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
};

export default {
    login
};
