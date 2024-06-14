// Route handle for POST /api/todos
const createTodoHandler = (req, res, todos) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const { title } = JSON.parse(body);
        const newTodo = { id: todos.length + 1, title, completed: false };
        todos.push(newTodo);
        res.statusCode = 201;
        res.end(JSON.stringify(newTodo));
    });
};

export { createTodoHandler };