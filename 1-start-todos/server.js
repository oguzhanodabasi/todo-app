import express from 'express';

import connectDB from './db.js';
import authRouter from './routes/authRoute.js';
import todosRouter from './routes/todosRoute.js'
import usersRouter from './routes/usersRoute.js';
import boardsRouter from './routes/usersRoute.js';
import errorHandler  from './utils/errorHandler.js';
import routeNotFoundHandler from './utils/notFoundHandler.js';

const app = express();
const PORT = process.env.PORT;

// Middleware: JSON parser
app.use(express.json());

// MongoDB'ye bağlanma işlemi
connectDB();

// Middleware: Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Sonraki middleware veya route handler'a devam etmek için next() fonksiyonunu çağır.
});

//Route: auth
app.use('/api/auth', authRouter);

//Route: boards
app.use('/api/boards', boardsRouter);

// Route: todos
app.use('/api/todos', todosRouter);

//Route: users
app.use('/api/users', usersRouter);

// Route not found handler
app.use(routeNotFoundHandler);

// Middleware: Error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

