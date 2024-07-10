import User from '../models/usersModel.js';
import Board from '../models/boardsModel.js'
import UserBoard from '../models/userBoardsModel.js';

// Route handler for GET /api/userboards/:boardId
export const addUserToBoardByEmail = async (adminUserId, boardId, email) => {
    const board = await Board.findById(boardId);

    if (!board || board.adminUserId.toString() !== adminUserId) {
        throw new Error('Unauthorized to add users to this board.');
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        throw new Error('User with this email does not exist.');
    }

    const userBoard = new UserBoard();
    userBoard.userId = user._id;
    userBoard.boardId = boardId;
    await userBoard.save();
    return userBoard;
};

// Route handler for DELETE /api/userboards/:boardId
export const removeUserFromBoardByEmail = async (adminUserId, boardId, email) => {
    const board = await Board.findById(boardId);

    if (!board || board.adminUserId.toString() !== adminUserId) {
        throw new Error('Unauthorized to remove users from this board.');
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        throw new Error('User with this email does not exist.');
    }
    
    const removedUserFromBoard = await UserBoard.findOneAndDelete({ userId: user._id, boardId: boardId });
    return removedUserFromBoard;
};