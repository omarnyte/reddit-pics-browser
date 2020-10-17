import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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

const randomPost = {
  data: {
    id: 'randomPost',
    title: 'Random Post',
    src: 'example.com/randomPost'
  }
}

describe('picture filtering', () => {
  test('renders an accessible thumbnail for every reddit post when query is empty', () => {
    const { getByAltText } = render(<PicsPreview redditPosts={[redditPost1, redditPost2]} />);

    const firstPost = getByAltText(redditPost1.data.title);
    expect(firstPost).toBeInTheDocument();

    const secondPost = getByAltText(redditPost2.data.title);
    expect(secondPost).toBeInTheDocument();
  });

  test('renders the images whose titles match the query', async () => {
    const { getByAltText, queryByAltText } = render(<PicsPreview redditPosts={[redditPost1, redditPost2, randomPost]} />);

    fireEvent.change(screen.getByLabelText('Filter Images'), {
      target: {value: 'random'},
    })

    expect(getByAltText(randomPost.data.title)).toBeInTheDocument();
    expect(queryByAltText(redditPost1.data.title)).toBeNull();
    expect(queryByAltText(redditPost2.data.title)).toBeNull();
  });
  
  test('renders no images when no image titles match the query', async () => {
    const { queryByAltText } = render(<PicsPreview redditPosts={[redditPost1, redditPost2, randomPost]} />);

    fireEvent.change(screen.getByLabelText('Filter Images'), {
      target: {value: 'foo'},
    })

    expect(queryByAltText(randomPost.data.title)).toBeNull();
    expect(queryByAltText(redditPost1.data.title)).toBeNull();
    expect(queryByAltText(redditPost2.data.title)).toBeNull();
  });
});

