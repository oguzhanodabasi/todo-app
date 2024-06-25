import {todos} from '../models/todosData.js'

// Route handler for GET /api/todos
const getTodosAction = (req, res) => {
    res.status(200).json(todos);
};

export { getTodosAction };