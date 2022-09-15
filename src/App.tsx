import React from 'react';
import { ChatsList } from './components/ChatsListScreen/';
import { ChatsNavBar } from './components/ChatsListScreen/';

const App: React.FC = () => {
  return (
    <div>
      <ChatsNavBar />
      <ChatsList />
    </div>
  );
};

export default App;
