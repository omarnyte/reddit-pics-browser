import React from 'react';
import { render, screen } from '@testing-library/react';
import PostsList from './PostsList';

test('renders an indication when list is empty', () => {
  const handleClickDummy = () => {};
  render(<PostsList handleClick={handleClickDummy} posts={[]} />);

  expect(screen.getByRole('heading')).toHaveTextContent('No posts matched your query!');
});
