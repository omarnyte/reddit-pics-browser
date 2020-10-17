import React, { useEffect, useState } from 'react';
import PicsPreview from './PicsPreview/PicsPreview';
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
      setData(data);
    };

    fetchData();
  }, []);

  
  return (
    <div className="App">
      <h1>Reddit r/pics Browser</h1>
      { isLoading && <span>Loading...</span> }
      { data && <PicsPreview redditPosts={data.children}/> }
    </div>
  );
}

export default App;
