import UserBoard from '../models/userBoardsModel.js';

const addUserToBoard = async (userId, boardId) => {
    const userBoard = new UserBoard();
    userBoard.userId = userId;
    userBoard.boardId = boardId;
    await userBoard.save();
    return userBoard;
};

const removeUserFromBoard = async (userId, boardId) => {
    const removedUserFromBoard = UserBoard.findOneAndDelete({ userId: userId, boardId: boardId });
    return removedUserFromBoard;
};

const removeUserFromAllBoards = async (userId) => {
    const userBoards = await UserBoard.find({ userId: userId });
    for (let userBoard of userBoards) {
        await UserBoard.findOneAndDelete({ userId: userId, _id: userBoard._id });
    }
    return { success: true, message: 'User removed from all boards successfully' };
};

export default {
    addUserToBoard,
    removeUserFromBoard,
    removeUserFromAllBoards
};