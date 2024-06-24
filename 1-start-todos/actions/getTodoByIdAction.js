// // Route handler for GET /api/todos/:id
// const getTodoByIdAction = (req, res, todos) => {
//     const id = parseInt(req.url.split('/')[3], 10);
//     const todo = todos.find(todo => todo.id === id);
//     if (todo) {
//         res.statusCode = 200;
//         res.end(JSON.stringify(todo));
//     } else {
//         res.statusCode = 404;
//         res.end(JSON.stringify({ message: 'Todo not found' }));
//     }
// };

const getTodoByIdAction = (req, res, todos) => {
    const id = parseInt(req.params.id, 10);  // id parametresini doğrudan req.params üzerinden alıyoruz
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        res.status(200).json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
};

export { getTodoByIdAction };