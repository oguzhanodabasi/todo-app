import UserRepository from '../repositories/usersRepository.js';

const createUser = async (username, email) => {
    return await UserRepository.createUser(username, email);
}

const deleteUser = async (id) => {
    return await UserRepository.deleteUser(id);
};

const updateUser = async (id, username, email) => {
    return await UserRepository.updateUser(id, username, email);
};

const getAllUsers = async () => {
    return await UserRepository.getAllUsers();
};

const getUserById = async (id) => {
    return await UserRepository.getUserById(id);
};

export default {
    createUser,
    deleteUser,
    updateUser,
    getAllUsers,
    getUserById
};