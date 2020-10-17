import React from 'react';
import { render } from '@testing-library/react';
import PicsPreview from './PicsPreview';

const redditPost1 = {
  data: {
    id: 'redditPost1',
    title: 'Reddit Post 1',
    src: 'example.com/post1'
  }
}

const redditPost2 = {
  data: {
    id: 'redditPost2',
    title: 'Reddit Post 2',
    src: 'example.com/post2'
  }
}

test('renders an accessible thumbnail for every reddit post', () => {
  const { getByAltText } = render(<PicsPreview redditPosts={[redditPost1, redditPost2]} />);

  const firstPost = getByAltText(redditPost1.data.title);
  expect(firstPost).toBeInTheDocument();

  const secondPost = getByAltText(redditPost2.data.title);
  expect(secondPost).toBeInTheDocument();
});
