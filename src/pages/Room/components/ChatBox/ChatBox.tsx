import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import ChatItem from '../ChatItem';
import { Message, Channel, Client } from 'twilio-chat';
/* Styles */
import {
  Inbox,
  SendButton,
  ChatWrapper,
  TextInput,
} from './styles';
import { FlexBox } from '../../../../styles';

interface Props {
  roomName: string;
  username: string;
}

const ChatBox: React.FC<Props> = ({ roomName, username }) => {
  const [chatConnecting, setChatConnecting] = useState<boolean>(false);
  const [channel, setChannel] = useState<Channel>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string | null>('');

  const scrollDiv = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const getToken = async (username: string) => {
    const response = await axios.get(
      `https://mental-health-chat-test.herokuapp.com/token/${username}`
    );
    const { data } = response;
    return data.token;
  };

  const joinChannel = async (channel: Channel) => {
    if (channel.status !== 'joined') {
      await channel.join();
    }

    setChannel(channel);
    setChatConnecting(false);

    channel.on('messageAdded', handleMessageAdded);
    scrollToBottom();
  };

  const connectToChatServer = async () => {
    let token = '';

    if (!username || !roomName) {
      navigate('/login');
    }

    setChatConnecting(true);

    try {
      token = await getToken(username);
    } catch {
      throw new Error('Unable to get token, please reload this page');
    }

    const client = await Client.create(token);

    client.on('tokenAboutToExpire', async () => {
      const token = await getToken(username);
      client.updateToken(token);
    });

    client.on('tokenExpired', async () => {
      const token = await getToken(username);
      client.updateToken(token);
    });

    client.on('channelJoined', async (channel) => {
      // getting list of all messages since this is an existing channel
      const inbox = await channel.getMessages();
      setMessages(inbox.items || []);
      scrollToBottom();
    });

    try {
      const channel = await client.getChannelByUniqueName(roomName);
      joinChannel(channel);
    } catch (err) {
      try {
        const channel = await client.createChannel({
          uniqueName: roomName,
          friendlyName: roomName,
        });

        joinChannel(channel);
      } catch {
        throw new Error('Unable to create channel, please reload this page');
      }
    }
  };

  const sendMessage = () => {
    if (text) {
      console.log(text)
      setChatConnecting(true);
      if (channel) {
        channel.sendMessage(String(text).trim());
      }
      setText('');
      setChatConnecting(false);
    }
  };

  const handleTextChange = (event: React.FormEvent) => {
    setText(event.currentTarget.textContent);
  };

  const scrollToBottom = () => {
    if (scrollDiv.current) {
      const scrollHeight = scrollDiv.current.scrollHeight;
      const height = scrollDiv.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      scrollDiv.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  const handleMessageAdded = (message: Message) => {
    setMessages((prev) => [...prev, message]);
    scrollToBottom();
  };

  const handleOnKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      console.log('text', text)
      sendMessage();
      event.preventDefault();
      if(inputRef.current) {
        inputRef.current.innerText = '';
        console.dir(inputRef.current)
      }
    }
  };

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, [text])

  useEffect(() => {
    connectToChatServer();
  }, []);

  return (
    <ChatWrapper>
      <Inbox margin={inputRef.current?.offsetHeight} ref={scrollDiv}>
        {messages &&
          messages.map((message) => (
            <ChatItem
              key={message.index}
              message={message}
              username={username}
            />
          ))}
      </Inbox>
      <FlexBox
        justify="space-between"
        align="center"
      >
        <TextInput //styled component for a <div>
          aria-label="Enter message..."
          ref={inputRef}
          className="size-14px weight-400 text-justify"
          role="textbox"
          data-content={true}
          spellCheck={true}
          contentEditable
          onInput={(event: any) => handleTextChange(event)}
          onKeyPress={(event: any) => handleOnKeyPress(event)}
        />
        <SendButton
          onClick={sendMessage}
          disabled={!channel}
          sx={{ marginLeft: '8px' }}
        >
          <SendIcon />
        </SendButton>
      </FlexBox>
    </ChatWrapper>
  );
};

export default ChatBox;
