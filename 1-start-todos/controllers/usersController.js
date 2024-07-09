import asyncHandler from "../utils/asyncHandler.js";
import usersService from "../services/usersService.js";

// Route handle for POST /api/users
const createUser = asyncHandler(async (req, res) => { // asyncHandler ile route handler'lar tarafından atılan hataları otomatik yakalama
    const { username, password } = req.body; // Express.js ile req.body üzerinden veriyi alıyoruz
    const newUser = await usersService.createUser(username, password);
    res.status(201).json(newUser); // Express.js ile status() ve json() metodları ile response döndürüyoruz
});

// Route handler for DELETE /api/users/:userId
const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const isDeleted = await usersService.deleteUser(userId); // ID'yi URL parametresinden al (Express.js)
    if (isDeleted) {
        res.status(200).json({ message: 'User is deleted' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Route handler for PUT /api/todos/:userId
const updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const { username, password } = req.body;
    const updatedUser = await usersService.updateUser(userId, username, password);
    if (updatedUser) {
        res.status(200).json({
            message: `User with id ${updatedUser.id} updated`,
            currentData: updatedUser
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Route handler for GET /api/users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await usersService.getAllUsers();
    res.status(200).json(users);
});

// Route handler for GET /api/users/:userId
const getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const user = await usersService.getUserById(userId);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

export default {
    createUser,
    deleteUser,
    updateUser,
    getAllUsers,
    getUserById
};