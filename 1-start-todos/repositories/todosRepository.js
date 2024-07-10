import Todo from '../models/todosModel.js';
import UserBoard from '../models/userBoardsModel.js';

export const createTodo = async (title, completed, boardId, userId) => {
    const userBoard = await UserBoard.findOne({ userId: userId, boardId: boardId });

    if (!userBoard) {
        throw new Error('Unauthorized access to board.');
    }

    const newTodo = new Todo();
    newTodo.title = title;
    newTodo.completed = completed;
    newTodo.boardId = boardId;
    await newTodo.save();
    return newTodo;
}

export const deleteTodo = async (todoId, boardId, userId) => {
    const userBoard = await UserBoard.findOne({ userId: userId, boardId: boardId });

    if (!userBoard) {
        throw new Error('Unauthorized access to board.');
    }

    const deletedTodo = await Todo.findOneAndDelete({ _id: todoId, boardId: boardId });
    return deletedTodo;
};

export const updateTodo = async (todoId, boardId, userId, title, completed) => {
    const userBoard = await UserBoard.findOne({ userId: userId, boardId: boardId });

    if (!userBoard) {
        throw new Error('Unauthorized access to board.');
    }

    const updatedTodo = await Todo.findOneAndUpdate({ _id: todoId, boardId: boardId }, { title, completed }, { new: true });
    return updatedTodo;
};