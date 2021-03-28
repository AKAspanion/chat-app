import { useEffect } from 'react';

import './styles.css';
import close from '../../assets/close.svg';

let resetTimeout: any;
const Alert = ({ show, message, timeout = 2500, onChange }: any) => {
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
        <img className="close__icon" src={close} alt="close" />
      </div>
    </div>
  );
};

export default Alert;
