"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const socket = (io) => {
    io.on('connect', (socket) => {
        const onError = (error) => {
            console.error(error);
            socket.emit('leave', {
                error: `Unexpected error occured`,
                devMessage: error.message,
            });
        };
        socket.on('join', ({ name, room }, callback) => {
            try {
                console.log(`${name} joined`);
                const { error, user } = user_1.addUser({ id: socket.id, name, room });
                if (error)
                    return callback(error);
                socket.join(user.room);
                socket.emit('message', {
                    user: 'bot',
                    text: `${user.name}, welcome to room ${user.room}.`,
                });
                socket.broadcast
                    .to(user.room)
                    .emit('message', { user: 'bot', text: `${user.name} has joined!` });
                io.to(user.room).emit('roomData', {
                    room: user.room,
                    users: user_1.getUsersInRoom(user.room),
                });
                callback();
            }
            catch (error) {
                onError(error);
            }
        });
        socket.on('sendMessage', ({ message, timestamp }, callback) => {
            try {
                console.log(`${message} sent at ${timestamp}`);
                const user = user_1.getUser(socket.id);
                if (!user)
                    throw new Error('User not found');
                io.to(user.room).emit('message', {
                    user: user.name,
                    text: message,
                    timestamp,
                });
                callback();
            }
            catch (error) {
                onError(error);
            }
        });
        socket.on('disconnect', () => {
            try {
                console.log(`disconnected`);
                const user = user_1.removeUser(socket.id);
                if (user) {
                    io.to(user.room).emit('message', {
                        user: 'bot',
                        text: `${user.name} has left.`,
                    });
                    io.to(user.room).emit('roomData', {
                        room: user.room,
                        message: `${user.name} left!`,
                        users: user_1.getUsersInRoom(user.room),
                    });
                }
            }
            catch (error) {
                onError(error);
            }
        });
    });
};
exports.default = socket;
