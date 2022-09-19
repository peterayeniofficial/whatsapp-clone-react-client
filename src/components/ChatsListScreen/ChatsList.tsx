import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { History } from 'history';
import { List, ListItem } from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const Container = styled.div`
  height: calc(100% - 56px);
  overflow-y: overlay;
`;

const StyledList = styled(List)`
  padding: 0 !important;
`;

const StyledListItem = styled(ListItem)`
  height: 76px;
  padding: 0 15px;
  display: flex;
`;

const ChatPicture = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

const ChatInfo = styled.div`
  width: calc(100% - 60px);
  height: 46px;
  padding: 15px 0;
  margin-left: 10px;
  border-bottom: 0.5px solid silver;
  position: relative;
`;

const ChatName = styled.div`
  margin-top: 5px;
`;

const MessageContent = styled.div`
  color: gray;
  font-size: 15px;
  margin-top: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const MessageDate = styled.div`
  position: absolute;
  color: gray;
  top: 20px;
  right: 0;
  font-size: 13px;
`;

export const getChatsQuery = gql`
  query Chats {
    chats {
      id
      name
      picture
      lastMessage {
        content
        id
        createdAt
      }
    }
  }
`;

interface ChatsListProps {
  history: History;
}

const ChatsList: React.FC<ChatsListProps> = ({ history }) => {
  const { data } = useQuery<any>(getChatsQuery);

  const navTochat = React.useCallback(
    (chat: any) => {
      history.push(`chats/${chat.id}`);
    },
    [history]
  );

  if (data === undefined || data.chats === undefined) {
    return null;
  }

  let chats = data.chats;

  return (
    <Container>
      <StyledList>
        {chats.map((chat: any) => (
          <StyledListItem
            key={chat.id}
            button
            data-testid="chat"
            onClick={navTochat.bind(null, chat)}
          >
            <ChatPicture
              src={chat.picture}
              alt="Profile"
              data-testid="picture"
            />
            <ChatInfo>
              <ChatName data-testid="name">{chat.name}</ChatName>
              {chat.lastMessage && (
                <React.Fragment>
                  <MessageContent data-testid="content">
                    {chat.lastMessage.content}
                  </MessageContent>
                  <MessageDate data-testid="date">
                    {moment(chat.lastMessage.createdAt).format('HH:mm')}
                  </MessageDate>
                </React.Fragment>
              )}
            </ChatInfo>
          </StyledListItem>
        ))}
      </StyledList>
    </Container>
  );
};

export default ChatsList;
