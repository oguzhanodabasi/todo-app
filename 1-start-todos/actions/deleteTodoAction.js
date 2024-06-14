// Route handle for DELETE /api/todos/:id
const deleteTodoHandler = (req, res, todos) => {
    const id = parseInt(req.url.split('/')[3], 10);
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        const deletedTodo = todos.splice(index, 1)[0];
        res.statusCode = 200;
        res.end(JSON.stringify({ message: `Todo with id ${id} deleted`, deletedData: deletedTodo }));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Todo not found' }));
    }
};

export { deleteTodoHandler };