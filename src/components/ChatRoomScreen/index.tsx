import React from 'react';
import styled from 'styled-components';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import MessageInput from './MessageInput';
import MessagesList from './MessagesList';
import { useParams } from 'react-router-dom';
import ChatRoomNavbar from './ChatRoomNavbar';

const Container = styled.div`
  background: url(/assets/chat-background.jpg);
  display: flex;
  flex-flow: column;
  height: 100vh;
`;

const getChatQuery = gql`
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      id
      name
      picture
      messages {
        id
        content
        createdAt
      }
    }
  }
`;


export interface ChatQueryMessage {
  id: string;
  content: string;
  createdAt: Date;
}

export interface ChatQueryResult {
  id: string;
  name: string;
  picture: string;
  messages: Array<ChatQueryMessage>;
}

const ChatRoomScreen: React.FC = () => {
  const client = useApolloClient();
  let { chatId } = useParams<{chatId: string}>();
  const { data } = useQuery<any>(getChatQuery, {
    variables: { chatId },
  });
  const chat = data?.chat;

  const onSendMessage = React.useCallback(
    (content: string) => {
      if (!chat) return null;

      const message = {
        id: (chat.messages.length + 10).toString(),
        createdAt: new Date(),
        content,
        __typename: 'Chat',
      };

      client.writeQuery({
        query: getChatQuery,
        variables: { chatId },
        data: {
          chat: {
            ...chat,
            messages: chat.messages.concat(message),
          },
        },
      });
    },
    [chat, chatId, client]
  );

  if (!chat) return <p>No Chat</p>;

  return (
    <Container>
      <ChatRoomNavbar chat={chat}/>
      {chat.messages && <MessagesList messages={chat.messages} />}
      <MessageInput onSendMessage={onSendMessage} />
    </Container>
  );
};

export default ChatRoomScreen;
