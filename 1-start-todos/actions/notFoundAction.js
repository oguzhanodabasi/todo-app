// // Not found handler
// const notFoundAction = (req, res) => {
//     res.statusCode = 404;
//     res.end(JSON.stringify({ message: 'Route not Found' }));
// };

// Not found handler
const notFoundAction = (req, res) => {
    res.status(404).json({ message: 'Route not found' });
};

export { notFoundAction };

