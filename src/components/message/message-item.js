import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Image } from 'semantic-ui-react';

const MessageItem = props => {
  const { message, username } = props;
  let containerStyle = (message.username === username) ? styles.messageItemOwnUserContainer : styles.messageItemOtherUserContainer
  return(
    <div>
      <div className={css(containerStyle)}>
        <Image src={message.avatar} avatar />
        <div className={css(styles.messageItemUsername)}>
          {message.username}
        </div>
      </div>
      <div className={css(styles.messageItemContentContainer)}>
        {message.text}
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  messageItemOwnUserContainer: {
    backgroundColor: 'red'
  },
  messageItemOtherUserContainer: {
    backgroundColor: 'green'
  },
  messageItemUsername: {},
  messageItemContentContainer: {}
})

export default MessageItem;