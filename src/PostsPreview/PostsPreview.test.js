import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import PostsPreview from './PostsPreview';

const redditPost1 = {
  author: 'author1',
  id: 'redditPost1',
  thumbnail: 'https://example.com/reddit-post-1',
  title: 'Reddit Post 1',
}

const redditPost2 = {
  author: 'author2',
  id: 'redditPost2',
  thumbnail: 'https://example.com/reddit-post-2',
  title: 'Reddit Post 2',
}

const randomPost = {
  author: 'author3',
  id: 'randomPost',
  thumbnail: 'https://example.com/random-post-2',
  title: 'Random Post',
}

describe('picture filtering', () => {
  test('renders an accessible thumbnail for every reddit post when query is empty', () => {
    const { getByAltText } = render(<PostsPreview redditPosts={[redditPost1, redditPost2]} />);

    const firstPost = getByAltText(redditPost1.title);
    expect(firstPost).toHaveAttribute('src', firstPost.thumbnail);

    const secondPost = getByAltText(redditPost2.title);
    expect(secondPost).toHaveAttribute('src', firstPost.thumbnail);
  });

  test('renders the images whose titles match the query', async () => {
    const { getByAltText, queryByAltText } = render(<PostsPreview redditPosts={[redditPost1, redditPost2, randomPost]} />);

    fireEvent.change(screen.getByLabelText('Filter Images'), {
      target: { value: 'random' },
    })

    expect(getByAltText(randomPost.title)).toHaveAttribute('src', randomPost.thumbnail);
    expect(queryByAltText(redditPost1.title)).toBeNull();
    expect(queryByAltText(redditPost2.title)).toBeNull();
  });

  test('renders no images when no image titles match the query', async () => {
    const { queryByAltText } = render(<PostsPreview redditPosts={[redditPost1, redditPost2, randomPost]} />);

    fireEvent.change(screen.getByLabelText('Filter Images'), {
      target: { value: 'foo' },
    })

    expect(queryByAltText(randomPost.title)).toBeNull();
    expect(queryByAltText(redditPost1.title)).toBeNull();
    expect(queryByAltText(redditPost2.title)).toBeNull();
  });
});

describe('clicking on a picture', () => {
  test('opens the detailed image view after clicking on an image preview', () => {
    render(<PostsPreview redditPosts={[redditPost1, redditPost2, randomPost]} />);

    userEvent.click(screen.getByText(redditPost1.title));

    expect(screen.getByRole('heading')).toHaveTextContent(redditPost1.title);
  });

  test("clicking the 'Go Back' button returns to the preview view", () => {
    render(<PostsPreview redditPosts={[redditPost1, redditPost2, randomPost]} />);

    userEvent.click(screen.getByText(redditPost1.title));
    userEvent.click(screen.getByText('Go Back'));

    expect(screen.queryByRole('heading')).toBeNull();
  });
});
