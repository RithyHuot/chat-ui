import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Image, Grid, Label } from 'semantic-ui-react';

const MessageItem = props => {
  const { message, username } = props;
  let isAuthor = message.username === username;
  let containerStyle = isAuthor ? styles.messageItemOwnUserContainer : styles.messageItemOtherUserContainer
  return(
    <Grid celled className={css(containerStyle)}>
      <Grid.Row>
        <Grid.Column className={css(styles.messageUserContainer)} width={4}>
          <Label color='blue' image>
            <Image src={message.avatar} avatar/>
            {message.username}
            <Label.Detail>{ isAuthor ? 'Author' : 'Contributor' }</Label.Detail>
          </Label>
        </Grid.Column>
        <Grid.Column className={css(styles.messageItemContentContainer)} width={11}>
          {message.text}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

const styles = StyleSheet.create({
  messageItemOwnUserContainer: {
    backgroundColor: '#80DAD6',
    color: 'black'
  },
  messageItemOtherUserContainer: {
    backgroundColor: '#E1F7F7',
    color: 'black'
  },
  messageItemContentContainer: {
    textAlign: 'left'
  },
  messageUserContainer: {
    textAlign: 'left'
  }
})

export default MessageItem;