import './styles.css';

const TextField = ({
  className = '',
  type,
  value,
  placeholder,
  icon = false,
  onIconClick,
  onKeyPress,
  onChange,
}: any) => {
  const handler = (func: Function, value: any) => {
    if (func) {
      func(value);
    }
  };

  return (
    <div className={`input__wrapper ${className}`.trim()}>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onKeyPress={event => handler(onKeyPress, event.key)}
        onChange={({ target: { value } }) => handler(onChange, value)}
        className={`input ${icon ? 'input--shrunk' : ''}`.trim()}
      />
      {icon && (
        <div
          className="input__send"
          onClick={event => handler(onIconClick, event)}
        >
          <img className="send_icon" src={icon} alt="send" />
        </div>
      )}
    </div>
  );
};

export default TextField;
