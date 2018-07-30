import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import io from 'socket.io-client';
import { WEBSOCKET_SERVER } from '../../util/socket';
import MessageItem from './message-item';

class MessageList extends React.Component {
  state = {
    messages: []
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

  render() {
    const { messages } = this.state;
    return (
      <div className={css(styles.messagesContainer)}>
        {
          messages.map((message, index) => (
          <MessageItem 
            key={`message-id-${index}`}
            message={message}
          />
        ))
        }
      </div>
    );
  }
}

const styles = StyleSheet.create({
  messagesContainer: {}
});

export default MessageList;