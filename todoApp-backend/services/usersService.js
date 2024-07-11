import * as usersRepository from '../repositories/usersRepository.js';

export const createUser = async (username, password, email) => {
    return await usersRepository.createUser(username, password, email);
}

export const deleteUser = async (userId) => {
    return await usersRepository.deleteUser(userId);
};

export const updateUser = async (userId, username, password, email) => {
    return await usersRepository.updateUser(userId, username, password, email);
};

export const getAllUsers = async () => {
    return await usersRepository.getAllUsers();
};

export const getUserById = async (userId) => {
    return await usersRepository.getUserById(userId);
};