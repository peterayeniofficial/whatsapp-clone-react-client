import React from 'react';
import { BrowserRouter, Route, Redirect, switch } from 'react-router-dom';
import ChatsListScreen from './components/ChatsListScreen';
import ChatRoomScreen from './components/ChatRoomScreen';

const App: React.FC = () => (
  <BrowserRouter>
    <switch>
      <Route exact path="/chats" component={ChatsListScreen} />
      <Route exact path='/chats/:chatId' component={ChatRoomScreen}/>
    </switch>
    <Route exact path="/" render={redirectToChats} />
  </BrowserRouter>
);

const redirectToChats = () => <Redirect to="/chats" />;

export default App;
