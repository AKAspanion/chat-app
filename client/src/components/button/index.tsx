import './styles.css';

const Button = ({ children, block = false, onClick }: any) => {
  return (
    <button
      onClick={event => onClick && onClick(event)}
      className={`button ${block ? 'button--block' : ''}`.trim()}
    >
      {children}
    </button>
  );
};

export default Button;
