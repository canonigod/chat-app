import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import classnames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { AppContext } from '../../../App/context';
import { SocketContext } from '../../../socket/context';
import { useFilteredUsers } from '../../../utils/useFilteredUsers';


import styles from './index.module.scss';

export const ConversationListItem = ({ conversationId, username, socketId }) => {
  const { socket } = useContext(SocketContext);
  const { conversations } = useContext(AppContext);
  const filteredUsers = useFilteredUsers();
  const [userTyping, setUserTyping] = useState(null);


  const conversation = conversations.find(
    (c) => c.conversationId === conversationId
  );

  const viewedUser = filteredUsers.find((u) =>
    conversation.userIds.includes(u.userId)
  );

  useEffect(() => {
    socket?.on('userTyping', (data) => {
      setUserTyping(data);
    });

  },[userTyping,  socket]);

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
        {
          viewedUser.socketId && userTyping ?
            <b>
              <p className={styles.name}>
                <MoreHorizIcon className={styles.typing}></MoreHorizIcon>
                {username}
              </p>
            </b>
            : viewedUser.socketId ?
              <b>
                <p className={styles.name}>
                  {viewedUser.socketId ?
                    <CircleIcon className={styles.onlineCircle}></CircleIcon>
                    : <CircleOutlinedIcon className={styles.offlineCircle}></CircleOutlinedIcon>
                  }
                  {username}
                </p>
              </b>
              : <p className={styles.name}>
                {viewedUser.socketId ?
                  <CircleIcon className={styles.onlineCircle}></CircleIcon>
                  : <CircleOutlinedIcon className={styles.offlineCircle}></CircleOutlinedIcon>
                }
                {username}
              </p>
        }

      </NavLink>
    </li>
  );

};
