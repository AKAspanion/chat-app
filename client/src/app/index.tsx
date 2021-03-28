import { useLayoutEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { Join, Chat } from '../views';
import { Alert } from '../components';
import {
  darkCSSVariables,
  lightCSSVariables,
  overrideThemeVariables,
} from '../util';

import './styles.css';

const alert = require('../assets/alert.wav');
const audio = new Audio(alert.default);

const URL = 'https://spanion-chat.herokuapp.com';
let socket = io(URL, { transports: ['websocket'] });

let olderTimestamp: any;

const App = () => {
  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [users, setUsers] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const [dark, setDark] = useState<boolean>(false);
  const [joined, setJoined] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  useLayoutEffect(() => {
    socket.on('message', message => {
      if (message.user !== 'bot') {
        audio.play();
      }

      setMessages(messages => [...messages, message]);
    });

    socket.on('roomData', ({ message, users }) => {
      setUsers(users);

      if (message) {
        setAlertMessage(message);
        setShowAlert(true);
      }
    });

    socket.on('leave', ({ error, devMessage }) => {
      console.error({ error, devMessage });

      reset();
    });

    handleTheme(localStorage.getItem('dark') === 'true');
  }, []);

  const reset = () => {
    setAlertMessage('');
    setShowAlert(false);
    setJoined(false);
    setMessages([]);
    setMessage('');
    setUsers([]);
    setName('');
    setRoom('');
  };

  const handleTheme = (value: boolean) => {
    localStorage.setItem('dark', String(value));

    setDark(value);

    overrideThemeVariables(value ? darkCSSVariables : lightCSSVariables);
  };

  const sendMessage = (event: MessageEvent) => {
    if (event) {
      event.preventDefault();
    }

    if (message) {
      const timestamp = new Date().valueOf();

      if (olderTimestamp) {
        if (Math.abs(olderTimestamp - timestamp) < 750) {
          setAlertMessage('Please wait a moment before sending again');
          setShowAlert(true);

          olderTimestamp = timestamp;
          return;
        }
      }

      olderTimestamp = timestamp;

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
    <div className="app">
      <Alert
        dark={dark}
        show={showAlert}
        message={alertMessage}
        onChange={(value: boolean) => setShowAlert(value)}
      />
      {joined ? (
        <Chat
          dark={dark}
          name={name}
          room={room}
          users={users}
          message={message}
          messages={messages}
          onSend={sendMessage}
          onTheme={handleTheme}
          setMessage={setMessage}
        />
      ) : (
        <Join onJoin={onJoin} />
      )}
    </div>
  );
};

export default App;
