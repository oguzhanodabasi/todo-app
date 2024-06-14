// Route handle for PUT /api/todos/:id
const updateTodoHandler = (req, res, todos) => {
    const id = parseInt(req.url.split('/')[3], 10);
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { title, completed } = JSON.parse(body);
            const previousData = todos[index];
            todos[index] = { ...todos[index], title, completed };
            res.statusCode = 200;
            res.end(JSON.stringify({ message: `Todo with id ${id} updated`, previousData: previousData, currentData: todos[index] }));
        });
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Todo not found' }));
    }
};

export { updateTodoHandler };