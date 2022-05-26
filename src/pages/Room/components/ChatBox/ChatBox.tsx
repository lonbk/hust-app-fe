import React, { useState, useEffect, useRef } from 'react';
import {
  Backdrop,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  List,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import ChatItem from '../ChatItem';
import { Message, Channel, Client } from 'twilio-chat';

import {
  Inbox,
  StyledTextField,
  SendButton,
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
  const [text, setText] = useState<string>('');

  const scrollDiv = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const scrollToBottom = () => {
    if (scrollDiv.current) {
      const scrollHeight = scrollDiv.current.scrollHeight;
      const height = scrollDiv.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      scrollDiv.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
    console.log('scrollDiv',scrollDiv.current)
  };

  const handleMessageAdded = (message: Message) => {
    setMessages((prev) => [...prev, message]);
    scrollToBottom();
  };

  const getToken = async (username: string) => {
    const response = await axios.get(`http://localhost:5000/token/${username}`);
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

  const sendMessage = () => {
    if (text) {
      setChatConnecting(true);
      if (channel) {
        channel.sendMessage(String(text).trim());
      }
      setText('');
      setChatConnecting(false);
    }
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

  useEffect(() => {
    connectToChatServer();
  }, []);

  return (
    <Grid container direction='column' spacing={2} sx={{ height: '100%', maxHeight: '100%', paddingTop: 5, paddingBottom: 5 }} wrap="nowrap">
      <Grid item xs={false} md={10}>
        <Inbox ref={scrollDiv}>
            {messages &&
              messages.map((message) => (
                <ChatItem
                  key={message.index}
                  message={message}
                  username={username}
                />
              ))}
        </Inbox>
      </Grid>
      <Grid item xs={false} md={2}>
        <Grid container spacing={2}>
          <Grid item xs={false} md={10}>
            <StyledTextField
              required
              autoFocus
              placeholder='Enter message'
              variant='outlined'
              multiline
              rows={2}
              value={text}
              disabled={!channel}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={(event) => {
                if(event.key === 'Enter') sendMessage()
              }}
            />
          </Grid>
          <Grid item xs={false} md={2}>
            <FlexBox column={false} justify='center' align='center' maxHeight>
              <SendButton onClick={sendMessage} disabled={!channel}>
                <SendIcon />
              </SendButton>
            </FlexBox>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChatBox;
