import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { useContext } from 'react';
import { useParams } from 'react-router';

import { AppContext } from '../../App/context';
import { useFilteredUsers } from '../../utils/useFilteredUsers';

import styles from './index.module.scss';

export const ChatViewHeader = () => {
  const { conversationId } = useParams();
  const filteredUsers = useFilteredUsers();
  const { conversations } = useContext(AppContext);

  const conversation = conversations.find(
    (c) => c.conversationId === conversationId
  );
  if (!conversation) {
    return (
      <div>
        <p>
          uh oh, we couldn&apost find a conversation with id: ${conversationId}
        </p>
      </div>
    );
  }

  const viewedUser = filteredUsers.find((u) =>
    conversation.userIds.includes(u.userId)
  );

  if (!viewedUser) {
    return (
      <div>
        <p>uh oh, we couldn&apost find another user for this conversation</p>
      </div>
    );
  }

  return (
    <div className={styles.header}>
      <h2 className={styles.marginBottom0}>{viewedUser.username}</h2>
      <p className={styles.marginTop0}>
        {viewedUser.socketId ? <CircleIcon className={styles.onlineCircle}></CircleIcon> : <CircleOutlinedIcon className={styles.offlineCircle}></CircleOutlinedIcon>}
        {viewedUser.socketId ? <span className={styles.onlineTxt}>Online</span> : <span className={styles.offlineTxt}>Offline</span> }
      </p>
    </div>
  );
};
