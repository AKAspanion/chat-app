import { Socket } from 'socket.io';
import { addUser, getUser, getUsersInRoom, removeUser } from '../user';

const socket = (io: any) => {
  io.on('connect', (socket: Socket) => {
    const onError = (error: any) => {
      console.error(error);

      socket.emit('leave', {
        error: `Unexpected error occured`,
        devMessage: error.message,
      });
    };

    socket.on('join', ({ name, room }, callback) => {
      try {
        console.log(`${name} joined`);

        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

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
          users: getUsersInRoom(user.room),
        });

        callback();
      } catch (error) {
        onError(error);
      }
    });

    socket.on('sendMessage', ({ message, timestamp }, callback) => {
      try {
        console.log(`${message} sent at ${timestamp}`);

        const user = getUser(socket.id);

        if (!user) throw new Error('User not found');

        io.to(user.room).emit('message', {
          user: user.name,
          text: message,
          timestamp,
        });

        callback();
      } catch (error) {
        onError(error);
      }
    });

    socket.on('disconnect', () => {
      try {
        console.log(`disconnected`);

        const user = removeUser(socket.id);

        if (user) {
          io.to(user.room).emit('message', {
            user: 'bot',
            text: `${user.name} has left.`,
          });
          io.to(user.room).emit('roomData', {
            room: user.room,
            message: `${user.name} left!`,
            users: getUsersInRoom(user.room),
          });
        }
      } catch (error) {
        onError(error);
      }
    });
  });
};

export default socket;
