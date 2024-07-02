import todosService from "../services/todosService.js";

// Route handle for POST /api/todos
const createTodo = (req, res) => {
    const { title } = req.body; // Express.js ile req.body üzerinden veriyi alıyoruz
    const newTodo = todosService.createTodo(title);
    res.status(201).json(newTodo); // Express.js ile status() ve json() metodları ile response döndürüyoruz
};

// Route handler for DELETE /api/todos/:id
const deleteTodo = (req, res) => {
    const isDeleted = todosService.deleteTodo(parse(req.params.id, 10)); // ID'yi URL parametresinden al (Express.js)
    if (isDeleted) {
        res.status(200).json({ message: 'Todo is deleted' });
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
};

// Route handler for PUT /api/todos/:id
const updateTodo = (req, res) => {
    const { title, completed } = req.body;
    const result = todosService.updateTodo(parse(req.params.id, 10), title, completed);
    if (result) {
        res.status(200).json({
            message: `Todo with id ${result.newTodo.id} updated`,
            previousData: result.oldTodo,
            currentData: result.newTodo
        });
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
};

// Route handler for GET /api/todos
const getAllTodos = (req, res) => {
    const todos = todosService.getAllTodos();
    res.status(200).json(todos);
};

// Route handler for GET /api/todos/:id
const getTodoById = (req, res) => {
    const todo = todosService.getTodoById(parse(req.params.id, 10));
    if (todo) {
        res.status(200).json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
};

export default {
    createTodo,
    deleteTodo,
    updateTodo,
    getAllTodos,
    getTodoById
};