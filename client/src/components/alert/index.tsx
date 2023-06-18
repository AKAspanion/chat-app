import { useEffect } from 'react';

import './styles.css';
import close from '../../assets/close.svg';
import closeDark from '../../assets/close-dark.svg';

let resetTimeout: any;
const Alert = ({ dark, show, message, timeout = 2500, onChange }: any) => {
  useEffect(() => {
    if (show) {
      clearTimeout(resetTimeout);
      resetTimeout = setTimeout(() => {
        onChange && onChange(false);
      }, timeout);
    }
  }, [show, timeout, onChange]);

  return (
    <div className={`alert alert--${show ? 'active' : 'inactive'}`}>
      <div className="alert__message">{message}</div>
      <div className="alert__icon" onClick={() => onChange && onChange(false)}>
        <img
          alt="close"
          className="close__icon"
          src={dark ? closeDark : close}
        />
      </div>
    </div>
  );
};

export default Alert;
