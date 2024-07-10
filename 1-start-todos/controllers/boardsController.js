import asyncHandler from 'express-async-handler';
import * as boardsService from '../services/boardsService.js';

// Route handle for POST /api/boards
export const createBoard = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { name } = req.body;
    const newBoard = await boardsService.createBoard(userId, name);
    res.status(201).json(newBoard);
});

// Route handler for DELETE /api/boards/:boardId
export const deleteBoard = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const boardId = req.params.boardId;
    const isDeleted = await boardsService.deleteBoard(userId, boardId);
    if (isDeleted) {
        res.status(200).json({ message: 'Board is deleted' });
    } else {
        res.status(404).json({ message: 'Board not found' });
    }
});

// Route handler for PUT /api/boards/:boardId
export const updateBoard = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const boardId = req.params.boardId;
    const { name } = req.body;
    const updatedBoard = await boardsService.updateBoard(userId, boardId, name);
    res.json(updatedBoard);
});

// Route handler for GET /api/boards
export const getAllBoards = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const boards = await boardsService.getAllBoards(userId);
    res.json(boards);
});

// Route handler for GET /api/boards/:boardId/todos
export const getBoardById = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const boardId = req.params.boardId;
    const board = await boardsService.getBoardById(userId, boardId);
    res.json(board);
});

// Route handler for GET /api/boards/:boardId/todos/:todoId
export const getTodoById = asyncHandler(async (req, res) => {
    const { userId, boardId, todoId } = req.params;
    const todo = await boardsService.getTodoById(userId, boardId, todoId);
    res.json(todo);
});