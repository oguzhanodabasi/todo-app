// Route handler for GET /api/todos/:id
const getTodoByIdHandler = (req, res, todos) => {
    const id = parseInt(req.url.split('/')[3], 10);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        res.statusCode = 200;
        res.end(JSON.stringify(todo));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Todo not found' }));
    }
};

export { getTodoByIdHandler };