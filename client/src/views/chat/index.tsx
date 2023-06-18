import { useState } from 'react';

import { Button, Messages, Users } from '../../components';

import './styles.css';
import sun from '../../assets/sun.svg';
import moon from '../../assets/moon.svg';
import menu from '../../assets/menu.svg';
import menuDark from '../../assets/menu-dark.svg';

const Chat = ({
  dark,
  name,
  room,
  users,
  message,
  messages,
  setMessage,
  onTheme,
  onSend,
}: any) => {
  const [showUsers, setShowUsers] = useState<boolean>(false);

  return (
    <div className="chat__wrapper">
      <div className="chat__container">
        <div className="chat__header">
          <div className="chat__menu" onClick={() => setShowUsers(!showUsers)}>
            <img src={dark ? menuDark : menu} alt="menu" />
          </div>
          <div title={room} className="chat__name">
            {room}
          </div>
          <div style={{ flexGrow: 1 }}></div>
          <div className="chat__actions">
            <div
              className="chat__theme"
              onClick={() => onTheme && onTheme(!dark)}
            >
              <img src={dark ? sun : moon} alt="theme" />
            </div>
            <Button onClick={() => window.location.reload()}>LEAVE</Button>
          </div>
        </div>
        <div className="chat__body">
          <div
            className={`chat__users ${
              showUsers ? 'chat__users--show' : ''
            }`.trim()}
          >
            <Users users={users} />
          </div>
          <div className="chat__messages">
            <Messages
              dark={dark}
              name={name}
              onSend={onSend}
              message={message}
              messages={messages}
              setMessage={setMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
