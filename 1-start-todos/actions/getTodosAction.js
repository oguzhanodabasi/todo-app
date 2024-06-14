// Route handler for GET /api/todos
const getTodosHandler = (req, res, todos) => {
    res.statusCode = 200;
    res.end(JSON.stringify(todos));

    //res.write(JSON.stringify(todos));
    //res.end();
};

export { getTodosHandler };