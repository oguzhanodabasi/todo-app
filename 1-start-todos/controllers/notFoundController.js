// Not found handler
const routeNotFoundAction = (req, res) => {
    res.status(404).json({ message: 'Route not found' });
};

export { routeNotFoundAction };

