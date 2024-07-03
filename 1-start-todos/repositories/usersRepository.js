import User from '../models/usersModel.js'

const getNextUserId = async () => {
    const lastTodo = await User.findOne().sort({ id: -1 });
    return lastTodo ? lastTodo.id + 1 : 1;
};

const createUser = async (username, email, password) => {
    const nextId = await getNextUserId();
    const newUser = new User();
    newUser.id = nextId;
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    await newUser.save();
    return newUser;
}

const deleteUser = async (id) => {
    const deletedUser = await User.findOneAndDelete({ id });
    return deletedUser;
};

const updateUser = async (id, username, email, password) => {
    const updatedUser = await User.findOneAndUpdate({ id }, { username, email, password }, { new: true });
    return updatedUser;
};

const getAllUsers = async () => {
    const users = await User.find({});
    return users;
};

const getUserById = async (id) => {
    const todo = await User.findOne({ id });
    return todo;
};

export default {
    createUser,
    deleteUser,
    updateUser,
    getAllUsers,
    getUserById
};