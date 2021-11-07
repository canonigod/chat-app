import { Dialog } from '@reach/dialog';
import qs from 'qs';
import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { v4 } from 'uuid';

import { AppContext } from '../../App/context';
import { SocketContext } from '../../socket/context';

import styles from './index.module.scss';

import '@reach/dialog/styles.css';

export const UsernameModal: React.FC = () => {
  const { pathname, search } = useLocation();
  const history = useHistory();
  const parsedParams = qs.parse(search, { ignoreQueryPrefix: true });
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const { socket } = useContext(SocketContext);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (currentUser?.userId) {
      setCurrentUser({
        username: e.target.value,
        userId: currentUser.userId,
      });
    } else {
      setCurrentUser({
        username: e.target.value,
        userId: v4(),
      });
    }
    localStorage.setItem('username', e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    history.push(`${pathname}`);
    socket?.emit('username', currentUser);
  };

  return (
    <Dialog
      aria-label="Username input"
      isOpen={Boolean(parsedParams.isEditingName) || false}
      onDismiss={() => history.push(`${pathname}`)}
      className={styles.roundedBorder}
    >
      <form className={styles.formControl} onSubmit={handleSubmit}>
        <label htmlFor="username">Edit your name</label>
        <p>Edit how your name displays when others chat with you.</p>

        <label htmlFor="username">Name</label>
        <input
          aria-label="Edit your name"
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={currentUser?.username || ''}
          placeholder="Enter your name"
        />
        <div className={styles.formFooter}>
          <button>Cancel</button>
          <input type="submit" value="Save" />
        </div>
      </form>
    </Dialog>
  );
};
