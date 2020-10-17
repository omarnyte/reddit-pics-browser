import React, { useEffect, useState } from 'react';
import PostsPreview from './PostsPreview/PostsPreview';
import './App.scss';

const REDDIT_PICS_URL = 'https://www.reddit.com/r/pics/.json?jsonp=';

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(REDDIT_PICS_URL);
      const { data } = await response.json();
      setIsLoading(false);
      setData(data.children.map(child => child.data));
    };

    fetchData();
  }, []);

  
  return (
    <div className="App">
      <h1>Reddit r/pics Browser</h1>
      { isLoading && <span>Loading...</span> }
      { data && <PostsPreview redditPosts={data}/> }
    </div>
  );
}

export default App;
