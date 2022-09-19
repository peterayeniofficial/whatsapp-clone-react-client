import React from 'react';
import styled from 'styled-components';
import { History } from 'history';

import ChatsList from '../ChatsList';
import ChatsNavBar from '../ChatsNavBar';
import { ChatQueryResult } from '../ChatRoomScreen';

const Container = styled.div`
  height: 100vh;
`;

interface ChatListScreenProps {
  history: History;
  chat: ChatQueryResult;
}

const ChatsListScreen: React.FC<ChatListScreenProps> = ({ history, chat }) => (
  <Container>
    <ChatsNavBar history={history} chat={chat} />
    <ChatsList history={history} />
  </Container>
);

export default ChatsListScreen;
