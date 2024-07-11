import User from '../models/usersModel.js';
import Board from '../models/boardsModel.js'
import UserBoard from '../models/userBoardsModel.js';

export const addUserToBoardByEmail = async (adminUserId, boardId, email) => {
    const board = await Board.findById(boardId);

    if (!board || board.admin_user_id.toString() !== adminUserId) {
        throw new Error('Unauthorized to add users to this board.');
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        throw new Error('User with this email does not exist.');
    }

    const userBoard = new UserBoard();
    userBoard.user_id = user._id;
    userBoard.board_id = boardId;
    await userBoard.save();
    return userBoard;
};

export const removeUserFromBoardByEmail = async (adminUserId, boardId, email) => {
    const board = await Board.findById(boardId);

    if (!board || board.admin_user_id.toString() !== adminUserId) {
        throw new Error('Unauthorized to remove users from this board.');
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        throw new Error('User with this email does not exist.');
    }
    
    const removedUserFromBoard = await UserBoard.findOneAndDelete({ user_id: user._id, board_id: boardId });
    return removedUserFromBoard;
};