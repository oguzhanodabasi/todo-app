import { createServer } from 'http';
import express from 'express';
import { getTodosAction } from './actions/getTodosAction.js';
import { getTodoByIdAction } from './actions/getTodoByIdAction.js';
import { createTodoAction } from './actions/createTodoAction.js';
import { updateTodoAction } from './actions/updateTodoAction.js';
import { deleteTodoAction } from './actions/deleteTodoAction.js';
import { notFoundAction } from './actions/notFoundAction.js';

const app = express();
const PORT = process.env.PORT;

let todos = [
    { id: 1, title: 'Learn Node.js', completed: false },
    { id: 2, title: 'Build a REST API', completed: false }
];

// Middleware: Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Sonraki middleware veya route handler'a devam etmek için next() fonksiyonunu çağır.
});

// Middleware: JSON
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next(); 
});

// Middleware: JSON parser
app.use(express.json());

// Route Handlers
app.post('/api/todos', (req, res) => createTodoAction(req, res, todos));
app.delete('/api/todos/:id', (req, res) => deleteTodoAction(req, res, todos));
app.get('/api/todos/:id', (req, res) => getTodoByIdAction(req, res, todos));
app.get('/api/todos', (req, res) => getTodosAction(req, res, todos));
app.put('/api/todos/:id', (req, res) => updateTodoAction(req, res, todos));

// Not found handler
app.use((req, res) => { 
    notFoundAction(req, res); // notFoundAction fonksiyonunu çağırıyoruz
});

// const server = createServer((req, res) => {
//     logger(req, res);
//     jsonMiddleware(req, res);
//     const routes = {
//         'POST/api/todos': createTodoAction,
//         'DELETE/api/todos/([0-9]+)': deleteTodoAction,
//         'GET/api/todos/([0-9]+)': getTodoByIdAction,
//         'GET/api/todos': getTodosAction,
//         'PUT/api/todos/([0-9]+)': updateTodoAction
//     };
//     const routeKey = `${req.method}${req.url}`;
//     let routeHandler = null;
//     for (const route in routes) {
//         const regex = new RegExp(`^${route}$`);
//         const match = regex.exec(routeKey);

//         if (match) {
//             routeHandler = routes[route];
//             break;
//         }
//     }
//     if (routeHandler) {
//         routeHandler(req, res, todos);
//     } else {
//         notFoundAction(req, res);
//     }
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

