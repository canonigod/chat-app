import { format, formatRelative } from 'date-fns';
import { useContext } from 'react';

import { AppContext } from '../../App/context';

import styles from './index.module.scss';

export const ChatViewMessage = (message) => {
  const { users } = useContext(AppContext);
  const sender = users.find((u) => u.userId === message.senderId);
  const relativeDay = formatRelative(new Date(message.createdAt), new Date())
    .split('at')[0]
    .trim();

  const senderName = sender.username.split(' ').slice(0, -1).join(' ');

  return (
    <div>
      <span className={styles.messageContainer}>
        <b><p className={styles.senderName}>{sender ? senderName : ''}</p></b>
        <p className={styles.sentAt}>
          {format(new Date(message.createdAt), 'h:mm a ')} {relativeDay}
        </p>
      </span>
      <p className={styles.messageText}>{message.body}</p>
    </div>
  );
};
