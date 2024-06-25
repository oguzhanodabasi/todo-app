import {todos} from '../models/todosData.js'

// Route handler for GET /api/todos/:id
const getTodoByIdAction = (req, res) => {
    const id = parseInt(req.params.id, 10);  // id parametresini doğrudan req.params üzerinden alıyoruz
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        res.status(200).json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
};

export { getTodoByIdAction };