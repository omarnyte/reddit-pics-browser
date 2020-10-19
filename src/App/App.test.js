import React from 'react';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from './App';
import { REDDIT_PICS_URL } from '../constants';

const server = setupServer(
  rest.get(REDDIT_PICS_URL, (req, res, ctx) => {
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

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders a header with the site title', () => {
  render(<App />);

  expect(screen.getByRole('heading')).toHaveTextContent('Reddit r/pics Browser');
});

test('renders a loading indicator while data is being fetched', () => {
  render(<App />);

  const loadingIndicator = screen.getByText('Loading...');
  expect(loadingIndicator).toBeInTheDocument();
});

test('renders an error indicator after data fails to fetch', async () => {
  server.use(
    rest.get(REDDIT_PICS_URL, (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  render(<App />);

  const loadingIndicator = await screen.findByText('Oops! Something went wrong. Please try again later.');
  expect(loadingIndicator).toBeInTheDocument();
});

test('renders the filter input thumbnail previews after the data has finished loading', async () => {
  render(<App />);

  const pictureFilterInput = await screen.findByLabelText('Filter Images');
  expect(pictureFilterInput).toBeInTheDocument();
});
