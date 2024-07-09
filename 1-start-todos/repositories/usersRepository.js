import User from '../models/usersModel.js';
import UserBoard from '../models/userBoardsModel.js';

const createUser = async (username, password) => {
    const newUser = new User();
    newUser.username = username;
    newUser.password = password;
    await newUser.save();
    return newUser;
}

const deleteUser = async (userId) => {
    const deletedUser = await User.findOneAndDelete({ _id: userId });

    // Kullanıcı varsa userBoard tablosundan ilgili kullanıcıyı sil
    if (deletedUser) {
        await UserBoard.deleteMany({ userId: userId });
    }
    
    return deletedUser;
};

const updateUser = async (userId, username, password) => {
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, { username, password }, { new: true });
    return updatedUser;
};

const getAllUsers = async () => {
    const users = await User.find({});
    return users;
};

const getUserById = async (userId) => {
    const todo = await User.findOne({ _id: userId });
    return todo;
};

export default {
    createUser,
    deleteUser,
    updateUser,
    getAllUsers,
    getUserById
};