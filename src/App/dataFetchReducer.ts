import { RedditPost } from '../types';

type RedditPicsResponse = RedditPost[];

type State = {
  hasError: boolean,
  isLoading: boolean,
  data: RedditPicsResponse | null
}

export const initialState: State = {
  hasError: false,
  isLoading: false,
  data: null
}

type Action = 
  | { type: 'START_FETCH' } 
  | { type: 'HANDLE_FETCH_SUCCESS', payload: RedditPicsResponse } 
  | { type: 'HANDLE_FETCH_FAILURE' } 


const dataFetchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'START_FETCH':
      return { 
        ...state,
        data: null,
        isLoading: true,
        hasError: false,
      }
    case 'HANDLE_FETCH_SUCCESS':
      return { 
        ...state,
        data: action.payload,
        isLoading: false,
        hasError: false,
      }
    case 'HANDLE_FETCH_FAILURE':
      return { 
        ...state,
        data: null,
        isLoading: false,
        hasError: true,
      }
    default:
      throw new Error('Not a valid action type.')
  }

}

export default dataFetchReducer;
