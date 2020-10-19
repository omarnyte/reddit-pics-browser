import React from 'react';
import { render, screen } from '@testing-library/react';
import PostsList from './PostsList';

test('renders an accessible thumbnail for every reddit post when query is empty', () => {
  const handleClickDummy = () => {};
  render(<PostsList handleClick={handleClickDummy} posts={[]} />);

  expect(screen.getByRole('heading')).toHaveTextContent('No posts matched your query!');
});
