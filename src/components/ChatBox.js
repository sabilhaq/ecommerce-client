import React, { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import request from '../services/api';
import ChatList from './ChatList';
import ChatForm from './ChatForm';
import { loadChats } from '../actions';

export default function ChatBox({
  setChatList,
  receiver,
  socket,
  sender,
  room,
}) {
  const { chats } = useSelector(
    (state) => ({
      chats: state.chats,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const addChat = (content) => {
    const id = uuidv4();
    if (content !== '') {
      setChatList((chats) => [
        ...chats,
        { content, status: 'Sender', _id: id, sent: true },
      ]);

      request
        .put(
          `users/chats/${receiver}`,
          {
            content,
            sender,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((response) => {
          setChatList((chats) =>
            chats.map((chat) => {
              if (chat._id === id) {
                chat._id = response.data._id;
              }
              return chat;
            })
          );
          socket.emit('addMessage', {
            content,
            username: sender,
            _id: response.data._id,
            room,
          });
        })
        .catch((error) => {
          console.log(error);
          setChatList((chats) =>
            chats.map((chat) => {
              if (chat._id === id) {
                chat.sent = false;
              }
              return chat;
            })
          );
        });
    }
  };

  const resendChat = (id, content) => {
    request
      .put(
        `users/chats/${receiver}`,
        {
          content,
          sender,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((response) => {
        setChatList((chats) =>
          chats.map((chat) => {
            if (chat._id === id) {
              chat.sent = true;
            }
            return chat;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeChat = (id) => {
    request
      .delete(`users/chats/${receiver}/chat/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setChatList((chats) =>
          chats.filter((chat) => {
            return chat._id !== id;
          })
        );
        socket.emit('removeMessage', {
          _id: id,
          room,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editChat = (id, content) => {
    request
      .put(
        `users/chats/${receiver}/chat/${id}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((response) => {
        socket.emit('editMessage', {
          content: response.data.content,
          _id: response.data._id,
          room,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(loadChats({ sender: localStorage.getItem('email'), receiver }));
  }, [dispatch, receiver]);

  const chatsEndRef = useRef(null);

  const scrollToBottom = () => {
    chatsEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <div className='ChatsContainer'>
      <h3 className='Title'>{receiver}</h3>

      <div className='Chats'>
        <ChatList
          chats={chats}
          resend={resendChat}
          remove={removeChat}
          edit={editChat}
        />

        <div ref={chatsEndRef} />

        <ChatForm socket={socket} add={addChat} receiver={receiver} />
      </div>
    </div>
  );
}
