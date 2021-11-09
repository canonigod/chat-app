import { useContext } from 'react';

import { AppContext } from '../../App/context';
import { useFilteredUsers } from '../../utils/useFilteredUsers';
import { NewMessageButton } from '../NewMessageButton';

import { ConversationListItem } from './ConversationListItem';
import styles from './index.module.scss';

export const LeftPanel = () => {
  const { conversations } = useContext(AppContext);
  const filteredUsers = useFilteredUsers();

  return (
    <div className={styles.container}>
      <NewMessageButton />
      <div className={styles.leftPanelContainer}>
        <div className={styles.chatRooms}>
          <h2>Channels</h2>
          <p>Guild-All</p>
          <p>Product-Team</p>
        </div>
        <h2>Direct Messages</h2>
      </div>
      <ul>
        {conversations.map((c) => {
          const otherUser = filteredUsers.find((u) =>
            c.userIds.includes(u.userId)
          );
          // null check to appease ts
          if (!otherUser) {
            return null;
          }
          return (
            <ConversationListItem
              conversationId={c.conversationId}
              key={c.conversationId}
              {...otherUser}
            />
          );
        })}
      </ul>
    </div>
  );
};
