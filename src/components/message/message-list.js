import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import io from 'socket.io-client';
import { WEBSOCKET_SERVER } from '../../util/socket';
import { AVATARS } from '../../util/avatars';
import MessageItem from './message-item';
import { Image, Form, Dropdown, Grid } from 'semantic-ui-react';

class MessageList extends React.Component {
  state = {
    messages: [],
    username: '',
    messageContent: '',
    avatar: 'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png'
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
    let messageContainer = document.getElementById('messageContainer');
    messageContainer.scrollTo(0, messageContainer.scrollHeight);
  }

  handleInput = field => {
    return (event, data) => {
      this.setState({
        [field]: data.value
      })
    };
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
          <Grid id='messageContainer' celled className={css(styles.messageList)}>
            {
              messages.map((message, index) => (
              <MessageItem
                username={username}
                key={`message-id-${index}`}
                message={message}
              />
            ))
            }
          </Grid>
        </div>
        <div className={css(styles.messageFormContainer)}>
          <Form 
            className={css(styles.messageForm)} 
            onSubmit={this.handleSubmit}
          >
            <Form.Group>
              <Form.Input
                required
                value={username}
                onChange={this.handleInput('username')}
                placeholder='Username'
              />
              <Form.Input
                control={Dropdown}
                options={AVATARS}
                search
                selection
                value={avatar}
                onChange={this.handleInput('avatar')}
                placeholder='Avatar'
              />
              <Image src={avatar} avatar/>
            </Form.Group>
            <Form.TextArea
              required
              value={messageContent}
              onChange={this.handleInput('messageContent')}
              placeholder='Type something...'
            />
            <Form.Button 
              className={css(styles.messageSendButton)}
              content='SEND' 
              disabled={isInvalid}
              labelPosition='left'
              icon='send'
              primary
            />
          </Form>
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  messagesContainer: {
    marginTop: '25px'
  },
  messageListContainer: {
    height: '60vh',
    overflow: 'hidden'
  },
  messageList: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
    boxShadow: 'none'
  },
  messageFormContainer: {
    position: 'relative',
    width: '100%',
    height: '23vh'
  },
  messageForm: {
    position: 'absolute',
    bottom: '10px',
    width: '100%'
  },
  messageSendButton: {
    textAlign: 'right'
  }
});

export default MessageList;