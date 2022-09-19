import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, waitFor, screen } from '@testing-library/react';
import ChatsList from './components/ChatsList';
import { createBrowserHistory } from 'history';

const server = setupServer(
  rest.post('localhost:4000/graphql', (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          chats: [
            {
              id: 1,
              name: 'Foo Bar',
              picture: 'https://localhost:4000/picture.jpg',
              lastMessage: {
                id: 1,
                content: 'Hello',
                createdAt: new Date('1 Jan 2019 GMT'),
              },
            },
          ],
        },
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ChatList', () => {
  test('renders fetched chats data', async () => {
    const history = createBrowserHistory();
    render(<ChatsList history={history} />);

    await waitFor(() => screen.findByTestId('name'));
    expect(screen.getByTestId('name')).toHaveTextContent('Foo Bar');

    // const picture = screen.getByTestId('picture');
    // expect(picture).toHaveAttribute(
    //   'src',
    //   'https://localhost:4000/picture.jpg'
    // );

    // const content = screen.getByTestId('content');
    // expect(content).toHaveTextContent('Hello');

    // const date = screen.getByTestId('date');
    // expect(date).toHaveTextContent('00:00');
  });
});
