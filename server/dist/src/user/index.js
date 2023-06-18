"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersInRoom = exports.getUser = exports.removeUser = exports.addUser = void 0;
const constants_1 = require("../assets/constants");
const users = [];
const addUser = ({ id, name = '', room = '' }) => {
    try {
        name = name.trim().toLowerCase();
        room = room.trim().toLowerCase();
        const existingUser = users.find((user) => user.room === room && user.name === name);
        if (!name || !room)
            return { error: constants_1.USERNAME_ROOM_REQUIRED };
        if (existingUser)
            return { error: constants_1.USERNAME_UNAVAILABLE };
        const user = { id, name, room };
        users.push(user);
        return { user };
    }
    catch (error) {
        return { error: error.message };
    }
};
exports.addUser = addUser;
const removeUser = (id) => {
    try {
        const index = users.findIndex((user) => user.id === id);
        if (index !== -1)
            return users.splice(index, 1)[0];
    }
    catch (error) {
        return { error: error.message };
    }
};
exports.removeUser = removeUser;
const getUser = (id) => {
    try {
        return users.find((user) => user.id === id);
    }
    catch (error) {
        return { error: error.message };
    }
};
exports.getUser = getUser;
const getUsersInRoom = (room) => {
    try {
        return users.filter((user) => user.room === room);
    }
    catch (error) {
        return { error: error.message };
    }
};
exports.getUsersInRoom = getUsersInRoom;
