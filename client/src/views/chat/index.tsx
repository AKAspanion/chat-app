// import React from 'react';

const Chat = ({ name, message, setMessage, onSend }: any) => {
  return (
    <div>
      {name}
      <input type="text" />
      <input
        type="text"
        className="input"
        value={message}
        placeholder="Type a message..."
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={event => (event.key === 'Enter' ? onSend(event) : null)}
      />
    </div>
  );
};

export default Chat;
