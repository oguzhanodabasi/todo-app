import {todos} from '../models/todosData.js'

// Route handler for PUT /api/todos/:id
const updateTodoAction = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
        const { title, completed } = req.body;
        const previousData = todos[index];
        todos[index] = { ...todos[index], title, completed };

        res.status(200).json({
            message: `Todo with id ${id} updated`,
            previousData: previousData,
            currentData: todos[index]
        });
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
};

export { updateTodoAction };