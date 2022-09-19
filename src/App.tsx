import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';
import ChatsListScreen from './components/ChatsListScreen';
import ChatRoomScreen from './components/ChatRoomScreen';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/chats">
          <ChatsListScreen />
        </Route>
        <Route
          exact
          path="/chats/:chatId"
          component={({ match }: RouteComponentProps<{ chatId: string }>) => (
            <ChatRoomScreen chatId={match.params.chatId} />
          )}
        />
      </Switch>
      <Route exact path="/" render={redirectToChats} />
    </Router>
  );
};

const redirectToChats = () => <Redirect to="/chats" />;

export default App;
