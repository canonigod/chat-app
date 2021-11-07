import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';

export const NewMessageButton = () => (
  <Link to="/" className={styles.textDecorationNone} >
    <div className={styles.newMessageBtn}>
      <button className={styles.button} type="button">
        New message
        <CreateOutlinedIcon className={styles.pencilIcon}></CreateOutlinedIcon>
      </button>
    </div>
  </Link>
);
