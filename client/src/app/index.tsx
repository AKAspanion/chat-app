import { useLayoutEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Alert } from '../components';

import { Join, Chat } from '../views';
import './styles.css';

const URL = 'http://localhost:8021';
let socket = io(URL, { transports: ['websocket'] });

const App = () => {
  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [users, setUsers] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const [joined, setJoined] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  useLayoutEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });

    socket.on('leave', ({ error, devMessage }) => {
      console.error({ error, devMessage });

      reset();
    });
  }, []);

  const reset = () => {
    setJoined(false);
    setMessages([]);
    setMessage('');
    setUsers([]);
    setName('');
    setRoom('');
  };

  const sendMessage = (event: MessageEvent) => {
    event.preventDefault();

    const timestamp = new Date().valueOf();

    if (message) {
      socket.emit('sendMessage', { message, timestamp }, () => setMessage(''));
    }
  };

  const onJoin = ({ name, room }: any) => {
    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, (error: any) => {
      if (error) {
        setAlertMessage(error);
        setShowAlert(true);

        return;
      }

      setJoined(true);
    });
  };

  return (
    <div
      style={{
        background: '#F3F6FF',
        height: '100vh',
        width: 'auto',
      }}
    >
      <Alert
        show={showAlert}
        message={alertMessage}
        onChange={(value: boolean) => setShowAlert(value)}
      />
      {joined ? (
        <Chat
          name={name}
          room={room}
          users={users}
          message={message}
          messages={messages}
          setMessage={setMessage}
          onSend={sendMessage}
        />
      ) : (
        <Join onJoin={onJoin} />
      )}
    </div>
  );
};

export default App;
