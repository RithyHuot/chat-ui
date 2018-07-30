import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import io from 'socket.io-client';
import { WEBSOCKET_SERVER } from '../../util/socket';
import { Image } from 'semantic-ui-react';

class MessageForm extends React.Component {
  state = {
    username: '',
    messageContent: '',
    avatar: 'https://spotim-demo-chat-server.herokuapp.com/avatars/003-pikachu.png'
  }
  
  handleInput = field => {
    return event => (
      this.setState({
        [field]: event.currentTarget.value
      })
    );
  }

  isValid = () => {
    const { username, messageContent } = this.state;
    return !!username && !!messageContent;
  }

  handleSubmit = event => {
    event.preventDefault();
    const { username, messageContent, avatar } = this.state;
    const socket = io(WEBSOCKET_SERVER);
    socket.emit('spotim/chat', {
      avatar: avatar,
      username: username,
      text: messageContent
    })
    this.setState({
      messageContent: ''
    })
  }

  render() {
    const { username, messageContent, avatar } = this.state;
    let isInvalid = !this.isValid();
    return(
      <div className={css(styles.messageFormContainer)}>
        <div className={css(styles.messageFormUserContainer)}>
          <Image 
            src={avatar}
            avatar
          />
          <input 
            required
            className={css(styles.messageUsernameInput)}
            type='text'
            value={username}
            onChange={this.handleInput('username')}
            placeholder='Username'
          />
        </div>
        <form className={styles.messageForm} onSubmit={this.handleSubmit}>
          <input
            required
            className={css(styles.messageFormInput)}
            type='textarea'
            value={messageContent}
            onChange={this.handleInput('messageContent')}
            placeholder='Type something...'
          />
          <input
            className={css(styles.messageFormSubmitButton)}
            disabled={isInvalid}
            type='submit'
            value='SEND'
          />
        </form>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  messageFormContainer: {},
  messageFormUserContainer: {},
  messageUsernameInput: {},
  messageForm: {},
  messageFormInput: {},
  messageFormSubmitButton: {}
});

export default MessageForm;