import { useState } from 'react';

import { Button, TextField } from '../../components';
import './styles.css';

const Join = ({ onJoin }: any) => {
  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');

  return (
    <div className="join__wrapper">
      <div className="join__container">
        <TextField
          type="text"
          placeholder="Name"
          onChange={(value: string) => setName(value)}
        />
        <div style={{ height: '24px' }}></div>
        <TextField
          type="text"
          placeholder="Room"
          onChange={(value: string) => setRoom(value)}
        />
        <div style={{ height: '36px' }}></div>
        <Button block onClick={() => onJoin && onJoin({ name, room })}>
          JOIN
        </Button>
        <div className="join__info">i</div>
        <div className="join__description">
          Join a room and share the room name with friends to invite them.
        </div>
      </div>
    </div>
  );
};

export default Join;
