import express from 'express';
import mongoose from 'mongoose';

import { todosRouter } from './routes/todosRoute.js'
import { errorHandler } from './utils/errorHandler.js';
import { routeNotFoundAction } from './controllers/notFoundController.js';

const app = express();
const PORT = process.env.PORT;

// Middleware: JSON parser
app.use(express.json());

// MongoDB'ye bağlanma işlemi
mongoose.connect('mongodb://localhost:27017/todoApp')
    .then(() => {
        console.log('MongoDB\'ye başarıyla bağlandı.');
    })
    .catch((err) => {
        console.error('MongoDB bağlantı hatası:', err.message);
        process.exit(1); // Uygulamayı hata durumunda sonlandır
    });

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

