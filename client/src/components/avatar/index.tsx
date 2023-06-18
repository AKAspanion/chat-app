import './styles.css';

const Avatar = ({ name, altBg = false }: any) => {
  const initials = () => {
    let initial = '';

    if (name) {
      const first = name[0];
      const second = name[1];

      if (first) {
        initial += first;
      }

      if (second) {
        initial += second;
      }
    }

    return initial.toUpperCase();
  };

  return (
    <div title={name} className={`avatar ${altBg ? 'avatar--bg' : ''}`.trim()}>
      {initials()}
    </div>
  );
};

export default Avatar;
