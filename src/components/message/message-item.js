import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Image } from 'semantic-ui-react';

const MessageItem = props => {
  const { message } = props;
  return(
    <div>
      <div className={css(styles.messageItemUserContainer)}>
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
  messageItemUserContainer: {},
  messageItemUsername: {},
  messageItemContentContainer: {}
})

export default MessageItem;