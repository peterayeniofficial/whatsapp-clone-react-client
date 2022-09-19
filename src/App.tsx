import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import { History } from 'history';

import ChatsListScreen from './components/ChatsListScreen';
import ChatRoomScreen from './components/ChatRoomScreen';
import AnimatedSwitch from './components/AnimatedSwitch';

const App: React.FC = () => {
  return (
    <Router>
      <AnimatedSwitch>
        <Route
          exact
          path="/chats"
          component={({
            match,
            history,
          }: RouteComponentProps<{ chatId: string; history: History }>) => (
            <ChatsListScreen chatId={match.params.chatId} history={history} />
          )}
        />

        <Route
          exact
          path="/chats/:chatId"
          component={({
            match,
            history,
          }: RouteComponentProps<{ chatId: string }>) => (
            <ChatRoomScreen chatId={match.params.chatId} history={history} />
          )}
        />
      </AnimatedSwitch>
      <Route exact path="/" render={redirectToChats} />
    </Router>
  );
};

const redirectToChats = () => <Redirect to="/chats" />;

export default App;
