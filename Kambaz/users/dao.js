import { v4 as uuidv4 } from "uuid";

export default function UsersDao(db) {
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    db.users = [...db.users, newUser];
    return newUser;
  };
  const findAllUsers = () => db.users;
  const findUserById = (userId) => db.users.find((user) => user._id === userId);
  const findUserByUsername = (username) =>
    db.users.find((user) => user.username === username);
  const findUserByCredentials = (username, password) =>
    db.users.find(
      (user) => user.username === username && user.password === password
    );
  const updateUser = (userId, userUpdates) => {
    const idx = db.users.findIndex((u) => u._id === userId);
    if (idx === -1) return null;
    const merged = { ...db.users[idx], ...userUpdates, _id: userId };
    db.users[idx] = merged;
    return merged;
  };
  const deleteUser = (userId) =>
    (db.users = db.users.filter((u) => u._id !== userId));
  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
  };
}
