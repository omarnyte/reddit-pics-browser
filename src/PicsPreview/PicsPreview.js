import React, { useEffect, useState } from 'react';
import './PicsPreview.scss';

const filterPostsByQuery = (posts, query) => {
  const lowerCaseQuery = query.toLowerCase();

  return posts.filter(post => {
    return post.data.title.toLowerCase().includes(lowerCaseQuery);
  })
}

function PicsPreview({ redditPosts }) {
  const [filteredPosts, setFilteredPosts] = useState(redditPosts);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query === "") {
      setFilteredPosts(redditPosts);
    } else {
      setFilteredPosts(filterPostsByQuery(redditPosts, query));
    }
  }, [query, redditPosts]);

  return (
    <>
      <div className="filtering-container">
        <label htmlFor="query">Filter Images</label>
        <input id="query" onChange={(e) => setQuery(e.target.value)} value={query} />
      </div>

      <div className="preview">
        {
          filteredPosts.map((redditPost) => {
            return (
              <div className="picture-preview-card" key={redditPost.data.id}>
                <img alt={redditPost.data.title} src={redditPost.data.thumbnail} />
                <span>{redditPost.data.title}</span>
              </div>
            )
          })}
      </div>
    </>
  );
}

export default PicsPreview;

// TODO: proptypes
