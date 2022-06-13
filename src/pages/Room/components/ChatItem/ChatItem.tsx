import React from 'react';
import { Message } from 'twilio-chat';

import {
  MessageWrapper,
  MessageAuthor,
  MessageContainer,
  MessageTimeStamp,
  MessageBody
} from './styles';

interface Props {
  message: Message;
  username: string;
}

const ChatItem: React.FC<Props> = ({ message, username }) => {
  const isOwnMessage = message.author === username;

  return (
    <MessageWrapper isOwnMessage={isOwnMessage}>
      <MessageAuthor>{message.author}</MessageAuthor>
      <MessageContainer isOwnMessage={isOwnMessage}>
        <MessageBody>{message.body}</MessageBody>
        <MessageTimeStamp isOwnMessage={isOwnMessage}>
          {new Date(message.dateCreated.toISOString()).toLocaleString()}
        </MessageTimeStamp>
      </MessageContainer>
    </MessageWrapper>
  );
};

export default ChatItem;
