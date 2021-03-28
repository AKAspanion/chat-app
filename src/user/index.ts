import {
  USERNAME_UNAVAILABLE,
  USERNAME_ROOM_REQUIRED,
} from '../assets/constants';

type User = {
  id: string;
  name: string;
  room: string;
};

const users: any = [];

export const addUser = ({ id, name = '', room = '' }: User): any => {
  try {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find(
      (user: User) => user.room === room && user.name === name,
    );

    if (!name || !room) return { error: USERNAME_ROOM_REQUIRED };

    if (existingUser) return { error: USERNAME_UNAVAILABLE };

    const user = { id, name, room };

    users.push(user);
    return { user };
  } catch (error) {
    return { error: error.message };
  }
};

export const removeUser = (id: string) => {
  try {
    const index = users.findIndex((user: User) => user.id === id);

    if (index !== -1) return users.splice(index, 1)[0];
  } catch (error) {
    return { error: error.message };
  }
};

export const getUser = (id: string) => {
  try {
    return users.find((user: User) => user.id === id);
  } catch (error) {
    return { error: error.message };
  }
};

export const getUsersInRoom = (room: string) => {
  try {
    return users.filter((user: User) => user.room === room);
  } catch (error) {
    return { error: error.message };
  }
};
