import { Avatar } from '..';
import './styles.css';

const Users = ({ users }: any) => {
  return (
    <div className="users__wrapper">
      <div className="users__heading">Users</div>
      {users.map(({ id, name }: any) => (
        <div key={id} className="user__wrapper">
          <Avatar altBg name={name} />
          <div title={name} className="user__name">
            {name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
