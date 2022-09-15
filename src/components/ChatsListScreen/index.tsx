import React from 'react';
import styled from 'styled-components';

import ChatsList from '../ChatsList';
import ChatsNavBar from '../ChatsNavBar';

const Container = styled.div`
  height: 100vh;
`;

const ChatsListScreen: React.FC = () => (
  <Container>
    <ChatsNavBar />
    <ChatsList />
  </Container>
);

export default ChatsListScreen;
