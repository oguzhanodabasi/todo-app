import asyncHandler from "../utils/asyncHandler.js";
import usersService from "../services/usersService.js";

// Route handle for POST /api/users
const createUser = asyncHandler(async (req, res) => { // asyncHandler ile route handler'lar tarafından atılan hataları otomatik yakalama
    const { username, email, password } = req.body; // Express.js ile req.body üzerinden veriyi alıyoruz
    const newUser = await usersService.createUser(username, email, password);
    res.status(201).json(newUser); // Express.js ile status() ve json() metodları ile response döndürüyoruz
});

// Route handler for DELETE /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
    const isDeleted = await usersService.deleteUser(parseInt(req.params.id, 10)); // ID'yi URL parametresinden al (Express.js)
    if (isDeleted) {
        res.status(200).json({ message: 'User is deleted' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Route handler for PUT /api/todos/:id
const updateUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const updatedUser = await usersService.updateUser(parseInt(req.params.id, 10), username, email);
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

// Route handler for GET /api/users/:id
const getUserById = asyncHandler(async (req, res) => {
    const user = await usersService.getUserById(parseInt(req.params.id, 10));
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