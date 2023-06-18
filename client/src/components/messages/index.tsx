import { useLayoutEffect, useRef } from 'react';

import TextField from '../text-field';
import Message from '../message';

import './styles.css';

import sendIcon from '../../assets/send.svg';
import sendDarkIcon from '../../assets/send-dark.svg';

const Messages = ({
  name,
  dark,
  onSend,
  message,
  messages,
  setMessage,
}: any) => {
  const messagesRef: any = useRef(null);

  useLayoutEffect(() => {
    if (messagesRef.current) {
      const elem: any = messagesRef.current;
      elem.scrollTop = elem.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="messages__wrapper">
      <div ref={messagesRef} className="messages__container">
        {messages.map(({ text, timestamp, user }: any, index: number) => (
          <Message
            key={index}
            user={user}
            text={text}
            name={name}
            timestamp={timestamp}
          />
        ))}
        {/* {JSON.stringify(messages.reverse())} */}
      </div>
      <TextField
        value={message}
        onIconClick={() => onSend()}
        placeholder="Type a message here..."
        icon={dark ? sendDarkIcon : sendIcon}
        onChange={(value: string) => setMessage(value)}
        onKeyPress={(key: string) => (key === 'Enter' ? onSend() : null)}
      />
    </div>
  );
};

export default Messages;
