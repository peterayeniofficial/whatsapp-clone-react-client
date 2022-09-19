import React from 'react';
import ReactDOM from 'react-dom/client';
import { MuiThemeProvider, createTheme } from '@material-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {client} from './client';

const theme = createTheme({
  palette: {
    primary: { main: '#2c6157' },
    secondary: { main: '#6fd056' },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <MuiThemeProvider theme={theme}>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  </MuiThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
