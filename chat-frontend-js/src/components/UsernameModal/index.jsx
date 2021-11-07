import CloseIcon from '@mui/icons-material/Close';
import '@reach/dialog/styles.css';
import { Dialog } from '@reach/dialog';
import qs from 'qs';
import { useContext, useState} from 'react';
import { useHistory, useLocation } from 'react-router';
import { v4 } from 'uuid';

import { AppContext } from '../../App/context';
import { SocketContext } from '../../socket/context';

import styles from './index.module.scss';


export const UsernameModal= () => {
  const { pathname, search } = useLocation();
  const history = useHistory();
  const parsedParams = qs.parse(search, { ignoreQueryPrefix: true });
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const { socket } = useContext(SocketContext);
  const [saveChanges, setSaveChanges] = useState(null);
  const [newUserName, setNewUserName] = useState('');

  const handleChange = (e) => {
    setNewUserName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(saveChanges){
      if (currentUser?.userId) {
        setCurrentUser({
          username: newUserName,
          userId: currentUser.userId,
        });
      } else {
        setCurrentUser({
          username: newUserName,
          userId: v4(),
        });
      }
      history.push(`${pathname}`);
      socket?.emit('username', currentUser);
      localStorage.setItem('username', newUserName);
    }
  };

  const closeModal = () => {
    setSaveChanges(false);
    setNewUserName('');
    history.push(`${pathname}`);
    console.log(localStorage.username);
    localStorage.setItem('username', localStorage.username);
  };

  return (
    <Dialog
      aria-label="Username input"
      isOpen={Boolean(parsedParams.isEditingName) || false}
      onDismiss={() => history.push(`${pathname}`)}
      className={styles.roundedBorder}
    >
      <form className={styles.formControl} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <div>
            <label htmlFor="username">Edit your name</label>
            <p>Edit how your name displays when others chat with you.</p>
          </div>
          <CloseIcon onClick={closeModal} className={styles.mousePointer} role="button">close</CloseIcon>
        </div>
        <input
          aria-label="Edit your name"
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={newUserName === '' && currentUser ? currentUser.username : newUserName}
          placeholder="Enter your name"
        />
        <div className={styles.formFooter}>
          <button onClick={closeModal}>Cancel</button>
          <input type="submit" value="Save" onClick={() => setSaveChanges(true)} />
        </div>
      </form>
    </Dialog>
  );
};
