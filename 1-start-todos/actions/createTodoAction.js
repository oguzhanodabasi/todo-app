// // Route handle for POST /api/todos
// const createTodoAction = (req, res, todos) => {
//     let body = '';
//     req.on('data', chunk => {
//         body += chunk.toString();
//     });
//     req.on('end', () => {
//         const { title } = JSON.parse(body);
//         const newTodo = { id: todos.length + 1, title, completed: false };
//         todos.push(newTodo);
//         res.statusCode = 201;
//         res.end(JSON.stringify(newTodo));
//     });
// };


// Route handle for POST /api/todos
const createTodoAction = (req, res, todos) => {
    const { title } = req.body; // Express.js ile req.body üzerinden veriyi alıyoruz
    const newTodo = { id: todos.length + 1, title, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo); // Express.js ile status() ve json() metodları ile response döndürüyoruz
};

export { createTodoAction };