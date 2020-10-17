import React from 'react';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from './App';

const server = setupServer(
  rest.get('reddit.com/r/pics/.json?jsonp=', (req, res, ctx) => {
    return res(ctx.json({ greeting: 'hello there' }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders a header with the site title', () => {
  render(<App />);

  expect(screen.getByRole('heading')).toHaveTextContent('Reddit r/pics Browser');
});

test('renders a loading indicator ', () => {
  render(<App />);
  
  const loadingIndicator = screen.getByText('Loading...');
  expect(loadingIndicator).toBeInTheDocument();
});

test('renders the filter input thumbnail previews after the data has finished loading', async () => {
  server.use(
    rest.get('reddit.com/r/pics/.json?jsonp=', (req, res, ctx) => {
      return res(ctx.json({
        data: {
          children: [
            {
              data: {
                id: 'redditPost1',
                thumbnail: 'https://example.com/reddit-post-1',
                title: 'Reddit Post 1',
              }
            },
            {
              data: {
                id: 'redditPost2',
                thumbnail: 'https://example.com/reddit-post-2',
                title: 'Reddit Post 2',
              }
            }
          ]
        }
      }))
    })
  )

  render(<App />);

  const pictureFilterInput = await screen.findByLabelText('Filter Images');
  expect(pictureFilterInput).toBeInTheDocument();
});