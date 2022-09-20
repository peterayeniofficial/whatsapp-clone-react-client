import React from 'react';
import styled from 'styled-components';
import {  useApolloClient, useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { defaultDataIdFromObject } from 'apollo-cache-inmemory';

import MessageInput from './MessageInput';
import MessagesList from './MessagesList';
import { useParams } from 'react-router-dom';
import ChatRoomNavbar from './ChatRoomNavbar';
import * as queries from '../../graphql/queries'
import * as fragments from '../../graphql/fragments';

const Container = styled.div`
  background: url(/assets/chat-background.jpg);
  display: flex;
  flex-flow: column;
  height: 100vh;
`;

const getChatQuery = gql`
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      ...FullChat
    }
  }
  ${fragments.fullChat}
`;

const addMessageMutation = gql`
  mutation AddMessage($chat: ID!, $content: String!){
    addMessage(chatId: $chatId, content: $content){
      ...Message
    }
  }
  ${fragments.message}
`


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

interface ChatsResult {
  chats: any[]
}

const ChatRoomScreen: React.FC = () => {
  // const client = useApolloClient();
  let { chatId } = useParams<{chatId: string}>();
  const { data } = useQuery<any>(getChatQuery, {
    variables: { chatId },
  });
  const chat = data?.chat;
  const [addMessage] = useMutation(addMessageMutation)

  const onSendMessage = React.useCallback(
    (content: string) => {
      // if (!chat) return null;

      // const message = {
      //   id: (chat.messages.length + 10).toString(),
      //   createdAt: new Date(),
      //   content,
      //   __typename: 'Chat',
      // };

      // client.writeQuery({
      //   query: getChatQuery,
      //   variables: { chatId },
      //   data: {
      //     chat: {
      //       ...chat,
      //       messages: chat.messages.concat(message),
      //     },
      //   },
      // });
      addMessage({
        variables: {chatId, content},
        optimisticResponse:{
          __typename: 'Mutation',
          addMessage:{
            __typename: 'Message',
            id: Math.random().toString(36).substring(2,9),
            createdAt: new Date(),
            content,
          }
        },
        update: (client, {data}) => {
          if(data && data.addMessage){
            type FullChat = { [key: string]: any };
            let fullChat;
            const chatIdFromStore = defaultDataIdFromObject(chat);

            if (chatIdFromStore === null) {
              return;
            }

            try {
              fullChat = client.readFragment<FullChat>({
                id: chatIdFromStore,
                fragment: fragments.fullChat,
                fragmentName: 'FullChat',
              });
            } catch (e) {
              return;
            }

            if (fullChat === null || 
                fullChat.messages === null ||
                data === null ||
                data.addMessage === null ||
                data.addMessage.id === null) {
              return;
            }
            if (fullChat.messages.some((currentMessage: any) => currentMessage.id === data.addMessage.id)){
              return;
            }

            fullChat.messages.push(data.addMessage);
            fullChat.lastMessage = data.addMessage;

            client.writeFragment({
              id: chatIdFromStore,
              fragment: fragments.fullChat,
              fragmentName: 'FullChat',
              data: fullChat,
            })
          }
          let clientChatsData
          try {
            clientChatsData = client.readQuery<ChatsResult>({
              query: queries.chats,
            });
          } catch (e) {
            return;
          }
          if (!clientChatsData?.chats) {
            return null;
          }

          const chats = clientChatsData.chats;

          const chatIndex = chats.findIndex((currentChat: any) => currentChat.id === chatId);
          if (chatIndex === -1) return;
          const chatWhereAdded = chats[chatIndex];

          chatWhereAdded.lastMessage = data.addMessage;
          // The chat will appear at the top of the ChatsList component
          chats.splice(chatIndex, 1);
          chats.unshift(chatWhereAdded);

          client.writeQuery({
            query: queries.chats,
            data: { chats: chats },
          });
        }
      })
    },
    [chat, chatId, addMessage]
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

