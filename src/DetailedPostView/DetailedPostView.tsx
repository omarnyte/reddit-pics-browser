import { RedditPost } from '../types';
import React from 'react';
import './DetailedPostView.scss';

type Props = { 
  goBack: () => void;
  redditPost: RedditPost
}

function DetailedPostView({ goBack, redditPost }: Props) {
  return (
    <>
      <button onClick={goBack}>Go Back</button>
      <h2>{redditPost.title}</h2>
      <div className="picture-and-info-wrapper">
        <img alt={redditPost.title} src={redditPost.url} />
        <div className="post-info">
          <span><strong>Author:</strong> {redditPost.author}</span>
          <span><strong>Number of Comments:</strong> {redditPost.num_comments}</span>
        </div>
      </div>
    </>
  )
}

export default DetailedPostView;
