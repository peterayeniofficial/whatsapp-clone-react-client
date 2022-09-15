import React from 'react';
import moment from 'moment';
import { List, ListItem } from '@material-ui/core';
import { chats } from '../../db';

const ChatsList: React.FC = () => {
  return (
    <div>
      <div>
        <List>
          {chats.map((chat) => (
            <ListItem key={chat.id}>
              <img src={chat.picture} alt={chat.name} />
              <div>{chat.name}</div>
              {chat.lastMessage && (
                <>
                  <div>{chat.lastMessage?.content}</div>
                  <div>
                    {moment(chat.lastMessage?.createdAt).format('HH:mm')}
                  </div>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default ChatsList;
