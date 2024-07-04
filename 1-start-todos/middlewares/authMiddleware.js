import jwt from 'jsonwebtoken';
import User from '../models/usersModel.js';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized, please check token!' });
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || decoded.salt !== user.salt) {
            return res.status(401).json({ message: 'Unauthorized, please check token and user!' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

export default authMiddleware;
