import Board from '../models/boardsModel.js';
import UserBoard from '../models/userBoardsModel.js';

const createBoard = async (boardName) => {
    const newBoard = new Board({ boardName });
    await newBoard.save();
    return newBoard;
};

const deleteBoard = async (boardId) => {
    const deletedBoard = await Board.findOneAndDelete({ _id: boardId });

    // Silinen board için userBoard tablosundan ilgili kayıtları temizle
    if (deletedBoard) {
        await UserBoard.deleteMany({ boardId: boardId });
    }

    return deletedBoard;
};

const updateBoard = async (boardId, name) => {
    const updatedBoard = await Board.findOneAndUpdate({ _id: boardId }, { name }, { new: true });
    return updatedBoard;
};

const getAllBoards = async (userId) => {
    const userBoards = (await UserBoard.find({ userId: userId }));
    const boardIds = userBoards.map(ub => ub.boardId);
    const boards = await Board.find({ _id: { $in: boardIds } }).populate('todos');
    return boards;
};

const getBoardById = async (userId, boardId) => {
    const userBoard = await UserBoard.findOne({ userId: userId, boardId: boardId });

    if (!userBoard) {
        throw new Error('Unauthorized access to board.');
    }

    const board = await Board.findById(boardId).populate('todos');
    return board;
};

const getTodoById = async (userId, boardId, todoId) => {
    const userBoard = await UserBoard.findOne({ userId: userId, boardId: boardId });

    if (!userBoard) {
        throw new Error('Unauthorized access to board.');
    }

    const todo = await Board.findOne({ _id: boardId, todos: todoId }).populate('todos');
    return todo;
};

export default {
    createBoard,
    deleteBoard,
    updateBoard,
    getAllBoards,
    getBoardById,
    getTodoById
};
