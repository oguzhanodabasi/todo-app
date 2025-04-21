import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import authRouter from './routes/authRoute.js';
import usersRouter from './routes/usersRoute.js';
import boardsRouter from './routes/usersRoute.js';
import errorHandler from './utils/errorHandler.js';
import routeNotFoundHandler from './utils/notFoundHandler.js';


// .env dosyasını yükle
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// CORS middleware'i - diğer middleware'lerden önce ekleyin
app.use(cors({
    origin: ['http://localhost:3000', 'todo-app-frontend-flax.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

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

//Route: users
app.use('/api/users', usersRouter);

//Route: boards-userboards-todos
app.use('/api/boards', boardsRouter);

// Route not found handler
app.use(routeNotFoundHandler);

// Middleware: Error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

