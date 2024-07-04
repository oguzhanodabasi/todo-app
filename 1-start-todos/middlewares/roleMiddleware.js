const roleMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Access is denied' });
    }
    next();
};

export default roleMiddleware;