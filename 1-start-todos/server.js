import express from 'express';

import { todosRouter } from './routes/todosRoute.js'
import { errorHandler } from './errorHandler.js';
import { routeNotFoundAction } from './controllers/notFoundController.js';

const app = express();
const PORT = process.env.PORT;

// Middleware: JSON parser
app.use(express.json());

// Middleware: Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Sonraki middleware veya route handler'a devam etmek için next() fonksiyonunu çağır.
});

// Route: todos
app.use('/api/todos', todosRouter);

// Route not found handler
app.use(routeNotFoundAction);

// Middleware: Error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

