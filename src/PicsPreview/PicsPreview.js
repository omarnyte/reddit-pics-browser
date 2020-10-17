import React from 'react';

function PicsPreview({ redditPosts }) {
  return (
    <div>
      {
        redditPosts.map((redditPost) => {
          return (
            <div key={redditPost.data.id}>
              <img alt={redditPost.data.title} src={redditPost.data.thumbnail} />
              <span>{redditPost.data.title}</span>
            </div>
          )
        })}
    </div>
  );
}

export default PicsPreview;

// TODO: proptypes
