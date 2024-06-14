import { createServer } from 'http';
import { getTodosHandler } from './actions/getTodosAction.js';
import { getTodoByIdHandler } from './actions/getTodoByIdAction.js';
import { createTodoHandler } from './actions/createTodoAction.js';
import { updateTodoHandler } from './actions/updateTodoAction.js';
import { deleteTodoHandler } from './actions/deleteTodoAction.js'
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

// const server = createServer((req, res) => {
//     logger(req, res => {
//         jsonMiddleware(req, res => {
//             if (req.url === '/api/todos' && req.method === 'GET') {
//                 getTodosHandler(req, res);
//             } else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === 'GET') {
//                 getTodoByIdHandler(req, res);
//             } else if (req.url === '/api/todos' && req.method === 'POST') {
//                 createTodoHandler(req, res);
//             } else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === 'PUT') {
//                 updateTodoHandler(req, res);
//             } else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === 'DELETE') {
//                 deleteTodoHandler(req, res);
//             } else {
//                 notFoundHandler(req, res);
//             }
//         });
//     });
// });

const server = createServer((req, res) => {
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {
            const { method, url } = req;
            const routes = {
                'POST/api/todos': createTodoHandler,
                'DELETE/api/todos/([0-9]+)': deleteTodoHandler,
                'GET/api/todos/([0-9]+)': getTodoByIdHandler,
                'GET/api/todos': getTodosHandler,
                'PUT/api/todos/([0-9]+)': updateTodoHandler
            };
            const routeKey = `${method}${url}`;
            const routeHandler = routes[routeKey];
            if (routeHandler) {
                routeHandler(req, res, todos);
            } else {
                notFoundHandler(req, res);
            }
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

