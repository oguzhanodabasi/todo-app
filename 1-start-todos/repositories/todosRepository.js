import Todo from '../models/todosModel.js';
import Board from '../models/boardsModel.js';
import UserBoard from '../models/userBoardsModel.js';

const createTodo = async (title, completed, boardId, userId) => {
    const userBoard = await UserBoard.findOne({ userId: userId, boardId: boardId });

    if (!userBoard) {
        throw new Error('Unauthorized access to board.');
    }

    const newTodo = new Todo();
    newTodo.title = title;
    newTodo.completed = completed;
    newTodo.boardId = boardId;
    await newTodo.save();
    await Board.findOneAndUpdate({ _id: boardId }, { $addToSet: { todos: newTodo._id } }, { new: true }); // Boards modeline todo eklenir.
    return newTodo;
}

const deleteTodo = async (todoId, boardId, userId) => {
    const userBoard = await UserBoard.findOne({ userId: userId, boardId: boardId });

    if (!userBoard) {
        throw new Error('Unauthorized access to board.');
    }

    const deletedTodo = await Todo.findOneAndDelete({ _id: todoId, boardId: boardId });

    if (deletedTodo) {
        await Board.findOneAndUpdate({ _id: boardId }, { $pull: { todos: todoId } }, { new: true });
    }
    
    return deletedTodo;
};

const updateTodo = async (todoId, boardId, userId, title, completed) => {
    const userBoard = await UserBoard.findOne({ userId: userId, boardId: boardId });

    if (!userBoard) {
        throw new Error('Unauthorized access to board.');
    }

    const updatedTodo = await Todo.findOneAndUpdate({ _id: todoId, boardId: boardId }, { title, completed }, { new: true });
    return updatedTodo;
};


export default {
    createTodo,
    deleteTodo,
    updateTodo
};