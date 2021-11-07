import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import classnames from 'classnames';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AppContext } from '../../../App/context';
import { useFilteredUsers } from '../../../utils/useFilteredUsers';


import styles from './index.module.scss';

export const ConversationListItem = ({ conversationId, username, socketId }) => {
  const { conversations } = useContext(AppContext);
  const filteredUsers = useFilteredUsers();

  const conversation = conversations.find(
    (c) => c.conversationId === conversationId
  );

  const viewedUser = filteredUsers.find((u) =>
    conversation.userIds.includes(u.userId)
  );

  return(
    <li
      className={classnames(styles.container, {
        [`${styles.online}`]: !!socketId,
      })}
    >
      <NavLink
        activeClassName={styles.active}
        className={styles.link}
        isActive={(match) => !!match}
        to={`/conversation/${conversationId}`}
      >
        <p className={styles.name}>
          {viewedUser.socketId ? <CircleIcon className={styles.onlineCircle}></CircleIcon> : <CircleOutlinedIcon className={styles.offlineCircle}></CircleOutlinedIcon>}
          {username}
        </p>
      </NavLink>
    </li>
  );

};
