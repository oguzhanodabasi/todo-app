import Board from '../models/boardsModel.js';
import UserBoard from '../models/userBoardsModel.js';

export const createBoard = async (userId, name) => {
    const newBoard = new Board();
    newBoard.adminUserId = userId;
    newBoard.name = name;
    await newBoard.save();

    const newUserBoard = new UserBoard();
    newUserBoard.userId = userId;
    newUserBoard.boardId = newBoard._id;
    await newUserBoard.save();
    return newBoard;
};

export const deleteBoard = async (userId, boardId) => {
    const board = await Board.findById(boardId);

    if (!board) {
        throw new Error('Board not found.');
    }

    if (board.adminUserId.toString() !== userId.toString()) {
        throw new Error('Only the admin user can delete this board.');
    }

    const deletedBoard = await Board.findOneAndDelete({ _id: boardId });

    if (deletedBoard) {
        await UserBoard.deleteMany({ boardId: boardId });
    }

    return deletedBoard;
};

export const updateBoard = async (userId, boardId, name) => {
    const board = await Board.findById(boardId);

    if (!board) {
        throw new Error('Board not found.');
    }

    if (board.adminUserId.toString() !== userId.toString()) {
        throw new Error('Only the admin user can update this board.');
    }

    const updatedBoard = await Board.findOneAndUpdate({ _id: boardId }, { name }, { new: true });
    return updatedBoard;
};

export const getAllBoards = async (userId) => {
    const userBoards = (await UserBoard.find({ userId: userId }));

    if (!userBoards) {
        throw new Error('User\'s boards not found.');
    }

    const boardIds = userBoards.map(ub => ub.boardId);
    const boards = await Board.find({ _id: { $in: boardIds } }).populate('todos');
    return boards;
};

export const getBoardById = async (userId, boardId) => {
    const userBoard = await UserBoard.findOne({ userId: userId, boardId: boardId });

    if (!userBoard) {
        throw new Error('Unauthorized access to board.');
    }

    const board = await Board.findById(boardId).populate('todos');
    return board;
};

export const getTodoById = async (userId, boardId, todoId) => {
    const userBoard = await UserBoard.findOne({ userId: userId, boardId: boardId });

    if (!userBoard) {
        throw new Error('Unauthorized access to board.');
    }

    const todo = await Board.findOne({ _id: boardId, todos: todoId }).populate('todos');
    return todo;
};
