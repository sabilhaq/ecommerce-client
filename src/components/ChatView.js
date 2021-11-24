import React, { useState, useEffect, useCallback } from 'react';
import request from '../services/api';
import { withRouter } from 'react-router-dom';
import { io } from 'socket.io-client';
import ChatBox from '../components/ChatBox';
import ContactList from '../components/ContactList';
import Navbar from './Navbar';

const socket = io(process.env.REACT_APP_BASE_URL || '');

function ChatView(props) {
  const [receiver, setReceiver] = useState('');
  const [room, setRoom] = useState('');
  const [contacts, setContacts] = useState([]);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    socket.on('invite', (data) => {
      if (data.partner === localStorage.getItem('username')) {
        socket.emit('join', data);
      }
    });

    socket.on('newMessage', (data) => {
      setChats((chats) => [
        ...chats,
        { content: data.content, status: 'Receiver', _id: data.id, sent: true },
      ]);
    });

    socket.on('deleteMessage', (data) => {
      setChats((chats) =>
        chats.filter((chat) => {
          return chat._id !== data._id;
        })
      );
    });

    socket.on('updateMessage', (data) => {
      setChats((chats) =>
        chats.map((chat) => {
          if (chat._id === data._id) {
            chat.content = data.content;
          }
          return chat;
        })
      );
    });

    return () => {
      socket.off('newMessage');
      socket.off('invite');
      socket.off('updateMessage');
      socket.off('deleteMessage');
      socket.off('deleteMessage');
    };
  }, []);

  const getChat = (email) => {
    setReceiver(email);
    const users = [];
    users.push(email, localStorage.getItem('email'));
    users.sort();
    setRoom(users.join('-'));
    socket.emit('emailClick', { room: users.join('-'), partner: email });
  };

  useEffect(() => {
    request
      .get(`users?token=${localStorage.getItem('token')}`)
      .then((response) => {
        setContacts(response.data);
      });
  }, []);

  const setChatList = useCallback((data) => {
    setChats(data);
  }, []);

  return (
    <React.Fragment>
      <Navbar />

      <div className='Chats'>
        <div className='ChatsContactsContainer'>
          <div className='ContactsContainer'>
            <h3 className='Title'>Users</h3>

            <div className='Contacts'>
              <ContactList
                getChat={getChat}
                contacts={contacts}
                receiver={receiver}
              />
            </div>
          </div>

          <ChatBox
            socket={socket}
            sender={localStorage.getItem('username')}
            receiver={receiver}
            room={room}
            chats={chats}
            setChatList={setChatList}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default withRouter(ChatView);
