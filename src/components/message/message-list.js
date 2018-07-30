import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import io from 'socket.io-client';
import { WEBSOCKET_SERVER } from '../../util/socket';
import MessageItem from './message-item';
import { Image } from 'semantic-ui-react';

class MessageList extends React.Component {
  state = {
    messages: [],
    username: '',
    messageContent: '',
    avatar: 'https://spotim-demo-chat-server.herokuapp.com/avatars/003-pikachu.png'
  }

  componentDidMount() {
    const socket = io(WEBSOCKET_SERVER);
    socket.on('spotim/chat', this.processMessages);
  }

  processMessages = message => {
    const { messages } = this.state;
    this.setState({ messages: [...messages, message] }, this.scrollToBottom);
  }

  scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
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
    const { username, avatar, messageContent, messages } = this.state;
    let isInvalid = !this.isValid();
    return (
      <div className={css(styles.messagesContainer)}>
        <div className={css(styles.messageListContainer)}>
          {
            messages.map((message, index) => (
            <MessageItem
              username={username}
              key={`message-id-${index}`}
              message={message}
            />
          ))
          }
        </div>
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
          <form className={css(styles.messageForm)} onSubmit={this.handleSubmit}>
            <textarea
              required
              className={css(styles.messageFormInput)}
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
      </div>
    );
  }
}

const styles = StyleSheet.create({
  messagesContainer: {},
  messageFormContainer: {
    width: '100%',
    display: 'flex',
    position: 'absolute',
    bottom: '0'
  },
  messageFormUserContainer: {
    width: '25%'
  },
  messageUsernameInput: {},
  messageForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '75%'
  },
  messageFormInput: {
    minHeight: '150px'
  },
  messageFormSubmitButton: {}
});

export default MessageList;