import asyncHandler from "../utils/asyncHandler.js";
import * as userBoardsService from '../services/userBoardsService.js';

// Route handle for POST /api/userboards/:boardId
export const addUserToBoardByEmail = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const boardId = req.params.boardId;
    const { email } = req.body;
    const userBoard = await userBoardsService.addUserToBoardByEmail(userId, boardId, email);
    res.status(200).json(userBoard);
});

// Route handle for DELETE /api/userboards/:boardId
export const removeUserFromBoardByEmail = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const boardId = req.params.boardId;
    const { email } = req.body;
    const userBoard = await userBoardsService.removeUserFromBoardByEmail(userId, boardId, email);
    res.status(200).json(userBoard);
});