import React, { useEffect, useState } from 'react';
import DetailedPostView from '../DetailedPostView/DetailedPostView';
import PostsList from '../PostsList/PostsList';
import PropTypes from 'prop-types';
import { RedditPost } from '../types';
import './PostsPreview.scss';

const filterPostsByQuery = (posts: RedditPost[], query: string) => {
  const lowerCaseQuery = query.toLowerCase();

  return posts.filter(post => {
    return post.title.toLowerCase().includes(lowerCaseQuery);
  })
}

type Props = {
  redditPosts: RedditPost[]
}

function PostsPreview({ redditPosts }: Props) {
  const [filteredPosts, setFilteredPosts] = useState(redditPosts);
  const [query, setQuery] = useState("");
  const [selectedPictureId, setSelectedPictureId] = useState<string | null> (null);

  useEffect(() => {
    if (query === "") {
      setFilteredPosts(redditPosts);
    } else {
      setFilteredPosts(filterPostsByQuery(redditPosts, query));
    }
  }, [query, redditPosts]);

  const selectedPost: RedditPost | undefined = redditPosts.find(post => post.id === selectedPictureId) 

  if (selectedPost) {
    return (
      <DetailedPostView
        goBack={() => setSelectedPictureId(null)}
        redditPost={selectedPost}
      />
    )
  } else {
    return (
      <>
        <div className="filtering-container">
          <label htmlFor="query">Filter Images</label>
          <input id="query" onChange={(e) => setQuery(e.target.value)} value={query} />
        </div>

        <div className="preview">
          <PostsList
            handleClick={(event) => setSelectedPictureId(event.currentTarget.id)}
            posts={filteredPosts}
          />
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
