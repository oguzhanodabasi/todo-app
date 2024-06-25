import express from 'express';

import { getTodosAction } from '../actions/getTodosAction.js';
import { deleteTodoAction } from '../actions/deleteTodoAction.js';
import { createTodoAction } from '../actions/createTodoAction.js';
import { updateTodoAction } from '../actions/updateTodoAction.js';
import { getTodoByIdAction } from '../actions/getTodoByIdAction.js';

const todosRouter = express.Router();

// Route Handlers
todosRouter.get('/', getTodosAction);
todosRouter.post('/', createTodoAction);
todosRouter.put('/:id', updateTodoAction);
todosRouter.get('/:id', getTodoByIdAction);
todosRouter.delete('/:id', deleteTodoAction);

export { todosRouter };