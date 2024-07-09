import userRepository from '../repositories/usersRepository.js';

const createUser = async (username, password) => {
    return await userRepository.createUser(username, password);
}

const deleteUser = async (userId) => {
    return await userRepository.deleteUser(userId);
};

const updateUser = async (userId, username, password) => {
    return await userRepository.updateUser(userId, username, password);
};

const getAllUsers = async () => {
    return await userRepository.getAllUsers();
};

const getUserById = async (userId) => {
    return await userRepository.getUserById(userId);
};

export default {
    createUser,
    deleteUser,
    updateUser,
    getAllUsers,
    getUserById
};