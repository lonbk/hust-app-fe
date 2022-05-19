/* Libs */
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { io } from 'socket.io-client';

interface MessageHistory {
    id: string;
    content: string;
  }

const host = 'https://test-test123xxx.herokuapp.com/';
const socket = io(host, { transports: ['websocket', 'polling', 'flashsocket'] });

export const ChatBox: React.FC = () => {
   
      const [messageHistory, setMessageHistory] = useState<MessageHistory[]>([]);
      const [message, setMessage] = useState('');
      const [id, setId] = useState(uuidv4());
    
      console.log('mess', messageHistory);
    
      const handleMessageChange = (msg: string) => {
        setMessage(msg);
      };
    
      const sendMessage = () => {
        if (message) {
          const msg = {
            content: message,
            id: id,
          };
    
          socket.emit('sendDataClient', msg);
    
          setMessage('');
        }
      };
    
      console.log('id', id)
    
      useEffect(() => {
    
          // const test = socket.on('getId', (data) => {
          //   console.log('id', data);
          //   setId(data);
          // });
    
          // console.log('test', test)
    
          socket.on('connect', () => {
            console.log('socket', socket.id);
          });
    
          socket.on('sendDataServer', (dataGot) => {
            console.log('dataGot', dataGot.data);
            setMessageHistory((oldMsgs) => [...oldMsgs, dataGot.data]);
          });
    
    
    
        return () => {
          socket.disconnect();
          setId('');
        };
      }, []);
    
      const msgStyle = (msgId: string) => ({
        padding: '5px 10px',
        backgroundColor: msgId === id ? '#007A64' : '#F4F5F9',
        borderRadius: '10px',
        margin: '5px 10px'
      })

    return (
        <>
        </>
    )
}