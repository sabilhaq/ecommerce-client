import React from 'react';
import ContactItem from './ContactItem';

export default function ContactList(props) {
  const nodeList = props?.contacts?.map(
    (contact) =>
      contact !== localStorage.getItem('email') && (
        <ContactItem
          key={contact}
          email={contact}
          getChat={props.getChat}
          style={
            props.receiver === contact ? 'Contact Active' : 'Contact'
          }
        />
      )
  );
  return nodeList;
}
