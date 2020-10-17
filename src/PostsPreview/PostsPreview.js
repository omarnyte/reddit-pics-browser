import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import DetailedPostView from '../DetailedPostView/DetailedPostView';
import './PostsPreview.scss';

const filterPostsByQuery = (posts, query) => {
  const lowerCaseQuery = query.toLowerCase();

  return posts.filter(post => {
    return post.title.toLowerCase().includes(lowerCaseQuery);
  })
}

function PostsPreview({ redditPosts }) {
  const [filteredPosts, setFilteredPosts] = useState(redditPosts);
  const [query, setQuery] = useState("");
  const [selectedPictureId, setSelectedPictureId] = useState(null);

  useEffect(() => {
    if (query === "") {
      setFilteredPosts(redditPosts);
    } else {
      setFilteredPosts(filterPostsByQuery(redditPosts, query));
    }
  }, [query, redditPosts]);

  if (selectedPictureId) {
    return <DetailedPostView
      goBack={() => setSelectedPictureId(null)}
      redditPost={redditPosts.find(post => post.id === selectedPictureId)}
    />
  } else {
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
                <div
                  className="picture-preview-card"
                  id={redditPost.id}
                  key={redditPost.id}
                  onClick={(event) => {
                    setSelectedPictureId(event.currentTarget.id)
                  }
                }
                >
                  <img alt={redditPost.title} src={redditPost.thumbnail} />
                  <span className="post-title">{redditPost.title}</span>
                </div>
              )
            })}
        </div>
      </>
    );
  }

}

PostsPreview.propTypes = {
  redditPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired)
}

export default PostsPreview;
