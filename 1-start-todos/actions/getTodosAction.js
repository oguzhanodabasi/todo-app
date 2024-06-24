// // Route handler for GET /api/todos
// const getTodosAction = (req, res, todos) => {
//     res.statusCode = 200;
//     res.end(JSON.stringify(todos));

//     //res.write(JSON.stringify(todos));
//     //res.end();
// };

const getTodosAction = (req, res, todos) => {
    res.status(200).json(todos);
};

export { getTodosAction };