import dataFetchReducer from './dataFetchReducer';

test('handles START_FETCH', () => {
  const action = { type: 'START_FETCH' };

  const returnedState = dataFetchReducer({}, action);

  expect(returnedState).toEqual({
    data: null,
    hasError: false,
    isLoading: true
  });
});

test('handles HANDLE_FETCH_SUCCESS', () => {
  const payload = { foo: 'bar' };
  const action = { 
    type: 'HANDLE_FETCH_SUCCESS',
    payload 
   };

  const returnedState = dataFetchReducer({}, action);

  expect(returnedState).toEqual({
    data: payload,
    hasError: false,
    isLoading: false
  });
});

test('handles HANDLE_FETCH_FAILURE', () => {
  const action = { type: 'HANDLE_FETCH_FAILURE' };

  const returnedState = dataFetchReducer({}, action);

  expect(returnedState).toEqual({
    data: null,
    hasError: true,
    isLoading: false
  });
});

test('throws an error when given an unexpected action', () => {
  const action = { type: 'unexpectedAction' };

  expect(() => {
    dataFetchReducer({}, action);
  }).toThrow();
});
