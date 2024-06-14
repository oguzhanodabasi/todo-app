// Not found handler
const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Route not Found' }));
};

export { notFoundHandler };