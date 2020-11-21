import dataFetchReducer, { initialState } from './dataFetchReducer';
import React, { useEffect, useReducer } from 'react';
import PostsPreview from '../PostsPreview/PostsPreview';
import { RedditPost } from '../types';
import { REDDIT_PICS_URL } from '../constants';
import './App.scss';

type RedditPicsResponse = {
  data: RedditPost
}

function App() {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  useEffect(() => {
    let isComponentMounted = true;
    
    const fetchData = async () => {
      dispatch({ type: 'START_FETCH' });

      try {
        const response = await fetch(REDDIT_PICS_URL);
        const { data } = await response.json();
        const posts = data.children.map((child: RedditPicsResponse) => {
          if (child.data.thumbnail === 'self') {
            child.data.thumbnail = `${process.env.PUBLIC_URL}/reddit-logo-thumbnail.png`;
            child.data.url = `${process.env.PUBLIC_URL}/reddit-logo.jpg`;
          }

          return child.data;
        });

        if (isComponentMounted) {
          dispatch({ type: 'HANDLE_FETCH_SUCCESS', payload: posts });
        }
      } catch {
        if (isComponentMounted) {
          dispatch({ type: 'HANDLE_FETCH_FAILURE' })
        }
      }
    };

    fetchData();

    return () => {
      isComponentMounted = false;
    }
  }, []);

  
  return (
    <div className="App">
      <h1>Reddit r/pics Browser</h1>
      { state.hasError && (
        <>
          <h2>Oops! Something went wrong. Please try again later.</h2> 
          <span>Verify that your ad/tracking blockers aren't blocking requests to reddit.com</span>
        </>
      )}
      { state.isLoading && <span>Loading...</span> }
      { state.data && <PostsPreview redditPosts={state.data}/> }
    </div>
  );
}

export default App;
