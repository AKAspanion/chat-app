import { Button, Messages } from '../../components';

import './styles.css';

const Chat = ({
  name,
  room,
  users,
  message,
  messages,
  setMessage,
  onSend,
}: any) => {
  return (
    <div className="chat__wrapper">
      <div className="chat__container">
        <div className="chat__header">
          <div className="chat__name">{room}</div>
          <Button>LEAVE</Button>
        </div>
        <div className="chat__body">
          <div className="chat__users">{JSON.stringify(users)}</div>
          <div className="chat__messages">
            <Messages
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
