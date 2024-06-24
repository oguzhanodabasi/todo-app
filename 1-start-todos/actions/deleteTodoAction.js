// // Route handle for DELETE /api/todos/:id
// const deleteTodoAction = (req, res, todos) => {
//     const id = parseInt(req.url.split('/')[3], 10);
//     const index = todos.findIndex(todo => todo.id === id);
//     if (index !== -1) {
//         const deletedTodo = todos.splice(index, 1)[0];
//         res.statusCode = 200;
//         res.end(JSON.stringify({ message: `Todo with id ${id} deleted`, deletedData: deletedTodo }));
//     } else {
//         res.statusCode = 404;
//         res.end(JSON.stringify({ message: 'Todo not found' }));
//     }
// };

// Route handler for DELETE /api/todos/:id
const deleteTodoAction = (req, res, todos) => {
    const id = parseInt(req.params.id, 10);  // ID'yi URL parametresinden al (Express.js)
    const index = todos.findIndex(todo => todo.id === id);
    
    if (index !== -1) {
        const deletedTodo = todos.splice(index, 1)[0];
        res.status(200).json({ 
            message: `Todo with id ${id} deleted`, 
            deletedData: deletedTodo 
        });
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
};

export { deleteTodoAction };