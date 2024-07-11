import Board from '../models/boardsModel.js';
import UserBoard from '../models/userBoardsModel.js';

export const createBoard = async (userId, name) => {
    const newBoard = new Board();
    newBoard.admin_user_id = userId;
    newBoard.name = name;
    await newBoard.save();

    const newUserBoard = new UserBoard();
    newUserBoard.user_id = userId;
    newUserBoard.board_id = newBoard._id;
    await newUserBoard.save();
    return newBoard;
};

export const deleteBoard = async (userId, boardId) => {
    const board = await Board.findById(boardId);

    if (!board) {
        throw new Error('Board not found.');
    }

    if (board.admin_user_id.toString() !== userId.toString()) {
        throw new Error('Only the admin user can delete this board.');
    }

    const deletedBoard = await Board.findOneAndDelete({ _id: boardId });

    if (deletedBoard) {
        await UserBoard.deleteMany({ board_id: boardId });
    }

    return deletedBoard;
};

export const updateBoard = async (userId, boardId, name) => {
    const board = await Board.findById(boardId);

    if (!board) {
        throw new Error('Board not found.');
    }

    if (board.admin_user_id.toString() !== userId.toString()) {
        throw new Error('Only the admin user can update this board.');
    }

    const updatedBoard = await Board.findOneAndUpdate({ _id: boardId }, { name }, { new: true });
    return updatedBoard;
};

export const getAllBoards = async (userId) => {
    const userBoards = (await UserBoard.find({ user_id: userId }));

    if (!userBoards) {
        throw new Error('User\'s boards not found.');
    }

    const boardIds = userBoards.map(ub => ub.board_id);
    const boards = await Board.find({ _id: { $in: boardIds } }).populate('todos');
    return boards;
};

export const getBoardById = async (userId, boardId) => {
    const userBoard = await UserBoard.findOne({ user_id: userId, board_id: boardId });

    if (!userBoard) {
        throw new Error('Unauthorized access to board.');
    }

    const board = await Board.findById(boardId).populate('todos');
    return board;
};

export const getTodoById = async (userId, boardId, todoId) => {
    const userBoard = await UserBoard.findOne({ user_id: userId, board_id: boardId });

    if (!userBoard) {
        throw new Error('Unauthorized access to board.');
    }

    const todo = await Board.findOne({ _id: boardId, todos: todoId }).populate('todos');
    return todo;
};
