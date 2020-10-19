const dataFetchReducer = (state, action) => {
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
        throw new Error(`${action.type} is not a valid action type.`)
  }

}

export default dataFetchReducer;
