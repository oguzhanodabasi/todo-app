import User from '../models/usersModel.js';
import UserBoard from '../models/userBoardsModel.js';

export const createUser = async (username, password, email) => {
    const newUser = new User();
    newUser.username = username;
    newUser.password = password;
    newUser.email = email;
    await newUser.save();
    return newUser;
}

export const deleteUser = async (userId) => {
    const deletedUser = await User.findOneAndDelete({ _id: userId });

    // Kullanıcı varsa userBoard tablosundan ilgili kullanıcıyı sil
    if (deletedUser) {
        await UserBoard.deleteMany({ userId: userId });
    }

    return deletedUser;
};

export const updateUser = async (userId, username, password, email) => {
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, { username, password, email }, { new: true });
    return updatedUser;
};

export const getAllUsers = async () => {
    const users = await User.find({});
    return users;
};

export const getUserById = async (userId) => {
    const todo = await User.findOne({ _id: userId });
    return todo;
};