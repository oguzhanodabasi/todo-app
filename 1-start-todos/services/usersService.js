import UserRepository from '../repositories/usersRepository.js';

const createUser = async (username, email, password) => {
    return await UserRepository.createUser(username, email, password);
}

const deleteUser = async (id) => {
    return await UserRepository.deleteUser(id);
};

const updateUser = async (id, username, email, password) => {
    return await UserRepository.updateUser(id, username, email, password);
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