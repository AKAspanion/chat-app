import Avatar from '../avatar';

import './styles.css';

const Message = ({ name, text, timestamp, user }: any) => {
  const isCurrentUser = () => user.toLowerCase() === name.toLowerCase();

  const isBot = () => user === 'bot';

  const time = () => {
    const date = new Date(timestamp);

    const normalizeDigit = (digit: number) =>
      `${digit < 10 ? '0' : ''}${digit}`;

    return `${normalizeDigit(date.getHours())}:${normalizeDigit(
      date.getMinutes(),
    )}`;
  };

  return (
    <div
      className={`message__wrapper ${
        isCurrentUser() ? 'message__wrapper--right' : ''
      }`.trim()}
    >
      {isBot() ? (
        <div className="message__bot">{text}</div>
      ) : (
        <>
          {!isCurrentUser() && (
            <>
              <Avatar name={user} />
              <div style={{ width: '8px' }}></div>
            </>
          )}
          <div
            className={`message__container ${
              isCurrentUser() ? 'message__container--right' : ''
            }`.trim()}
          >
            <div className="message__text">{text}</div>
            <div
              className={`message__timestamp ${
                isCurrentUser() ? 'message__timestamp--right' : ''
              }`.trim()}
            >
              {time()}
            </div>
          </div>
          {isCurrentUser() && (
            <>
              <div style={{ width: '8px' }}></div>
              <Avatar name={user} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Message;
