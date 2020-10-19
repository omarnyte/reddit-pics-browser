import React, { useEffect, useReducer } from 'react';
import PostsPreview from '../PostsPreview/PostsPreview';
import dataFetchReducer from './dataFetchReducer';
import { REDDIT_PICS_URL } from '../constants';
import './App.scss';

function App() {
  const initialState = {
    hasError: false,
    isLoading: false,
    data: null
  };
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  useEffect(() => {
    let isComponentMounted = true;
    
    const fetchData = async () => {
      dispatch({ type: 'START_FETCH' });

      try {
        const response = await fetch(REDDIT_PICS_URL);
        const { data } = await response.json();
        const posts = data.children.map(child => child.data);

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
      { state.hasError && <h2>Oops! Something went wrong. Please try again later.</h2> }
      { state.isLoading && <span>Loading...</span> }
      { state.data && <PostsPreview redditPosts={state.data}/> }
    </div>
  );
}

export default App;
