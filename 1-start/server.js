import { createServer } from 'http';
const PORT = process.env.PORT;

let todos = [
    { id: 1, title: 'Learn Node.js', completed: false },
    { id: 2, title: 'Build a REST API', completed: false }
]; 

// Logger middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

// JSON middleware
const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
};

// Route handler for GET /api/todos
const getTodosHandler = (req, res) => {
    res.statusCode = 200;
    res.end(JSON.stringify(todos));

    //res.write(JSON.stringify(todos));
    //res.end();
};

// Route handler for GET /api/todos/:id
const getTodoByIdHandler = (req, res) => {
    const id = parseInt(req.url.split('/')[3], 10);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        res.statusCode = 200;
        res.end(JSON.stringify(todo));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Todo not found' }));
    }
};

// Route handle for POST /api/todos
const createTodoHandler = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const { title } = JSON.parse(body);
        const newTodo = { id: todos.length + 1, title, completed: false };
        todos.push(newTodo);
        res.statusCode = 201;
        res.end(JSON.stringify(newTodo));
    });
};

// Route handle for PUT /api/todos/:id
const updateTodoHandler = (req, res) => {
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
            res.end(JSON.stringify({message: `Todo with id ${id} updated`,previousData: previousData,currentData: todos[index]}));
        });
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Todo not found' }));
    }
}

// Route handle for DELETE /api/todos/:id
const deleteTodoHandler = (req, res) => {
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

// Not found handler
const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Route not Found' }));
};

const server = createServer((req, res) => {
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {
            if (req.url === '/api/todos' && req.method === 'GET') {
                getTodosHandler(req, res);
            } else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === 'GET') {
                getTodoByIdHandler(req, res);
            } else if (req.url === '/api/todos' && req.method === 'POST') {
                createTodoHandler(req, res);
            } else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === 'PUT') {
                updateTodoHandler(req, res);
            } else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === 'DELETE') {
                deleteTodoHandler(req, res);
            } else {
                notFoundHandler(req, res);
            }
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

