/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable no-global-assign */
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ReactDOM from 'react-dom';
import {
  cleanup,
  render,
  waitFor,
  fireEvent,
  screen,
} from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";

import { createBrowserHistory } from 'history';
import ChatsList, { getChatsQuery } from './ChatsList';
import * as queries from '../../graphql/queries';

describe('ChatsList', () => {
  afterEach(() => {
    cleanup();
    // delete window?.location;
    window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        href: '/',
      },
      writable: true,
    });
  });

  const mocks = [
    {
      request: { query: queries.chats },
      result: {
        data: {
          chats: [
            {
              __typename: 'Chat',
              id: 1,
              name: 'Foo Bar',
              picture: 'https://localhost:4000/picture.jpg',
              lastMessage: {
                __typename: 'Message',
                id: 1,
                content: 'Hello',
                createdAt: new Date('1 Jan 2019 GMT'),
              },
            },
          ],
        },
      },
    },
  ]

  it('renders fetched chats data', async () => {
   

    const history = createBrowserHistory();

    {
      const { container, getByTestId } = render(
        <MockedProvider mocks={mocks}>
          <ChatsList  />
        </MockedProvider>
      );

      await screen.findByTestId('name');

      expect(getByTestId('name')).toHaveTextContent('Foo Bar');
      expect(getByTestId('picture')).toHaveAttribute(
        'src',
        'https://localhost:4000/picture.jpg'
      );
      expect(getByTestId('content')).toHaveTextContent('Hello');
      expect(getByTestId('date')).toHaveTextContent('00:00');
    }
  });

  it('should navigate to the target chat room on chat item click', async () => {


    const history = createBrowserHistory();

    {
      const { container, getByTestId } = render(
        <MockedProvider mocks={mocks}>
          <ChatsList  />
        </MockedProvider>
      );

      await screen.findByTestId('chat');

      fireEvent.click(getByTestId('chat'));

      await waitFor(() =>
        expect(history.location.pathname).toEqual('/chats/1')
      );
    }
  });
});
