import React from 'react';
import { RedditPost } from '../types';
import './PostsList.scss'

type Props = {
  handleClick: (event: React.MouseEvent) => void;
  posts: RedditPost[]
}

function PostsList({ handleClick, posts }: Props) {
  if (posts.length > 0) {
    return (
      <>
        {
          posts.map((redditPost) => (
            <div
              className="post-preview-card"
              id={redditPost.id}
              key={redditPost.id}
              onClick={handleClick}
            >
              <img alt={redditPost.title} src={redditPost.thumbnail} />
              <span className="post-title">{redditPost.title}</span>
            </div>
          ))
        }
      </>
    )
  } else {
    return <h2>No posts matched your query!</h2>
  }
}

export default PostsList;
