import * as userBoardsRepository from '../repositories/userBoardsRepository.js';

export const addUserToBoardByEmail = async (adminUserId, boardId, email) => {
    return await userBoardsRepository.addUserToBoardByEmail(adminUserId, boardId, email);
};

export const removeUserFromBoardByEmail = async (adminUserId, boardId, email) => {
    return await userBoardsRepository.removeUserFromBoardByEmail(adminUserId, boardId, email);
};